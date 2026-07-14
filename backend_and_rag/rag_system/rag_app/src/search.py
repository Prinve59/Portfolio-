import os
import pickle
import numpy as np
from typing import List, Any
from dotenv import load_dotenv
from rank_bm25 import BM25Okapi
from sentence_transformers import CrossEncoder
from langchain_groq import ChatGroq
from rag_app.src.vectorstore import FaissVectorStore
from rag_app.src.data_loader import load_all_documents

load_dotenv()


class RagSearch:
    def __init__(self, persist_dir: str = "faiss_store", embedding_model: str = "all-MiniLM-L6-v2", llm_model: str = "llama-3.3-70b-versatile", data_dir: str = None, force_rebuild: bool = False):
        self.vector_store = FaissVectorStore(persist_dir, embedding_model)

        faiss_path = os.path.join(persist_dir, "faiss.index")
        meta_path = os.path.join(persist_dir, "metadata.pkl")
        if force_rebuild or not (os.path.exists(faiss_path) and os.path.exists(meta_path)):
            documents = load_all_documents(data_dir)
            self.vector_store.build_documents(documents)
        else:
            self.vector_store.load()

        # BM25 over stored chunks
        self.texts = [m["text"] for m in self.vector_store.metadata]
        bm25_path = os.path.join(persist_dir, "bm25.pkl")
        if force_rebuild or not os.path.exists(bm25_path):
            self.bm25 = BM25Okapi([t.lower().split() for t in self.texts])
            with open(bm25_path, "wb") as f:
                pickle.dump(self.bm25, f)
            print(f"[INFO] BM25 index built and saved over {len(self.texts)} chunks")
        else:
            with open(bm25_path, "rb") as f:
                self.bm25 = pickle.load(f)
            print(f"[INFO] BM25 index loaded from disk")

        self.reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")
        self.llm = ChatGroq(model=llm_model, groq_api_key=os.getenv("groq_api_key"), temperature=0)
        print(f"[INFO] loaded LLM model:{llm_model}")

    def _sparse_search(self, query: str, top_k: int) -> List[int]:
        scores = self.bm25.get_scores(query.lower().split())
        return np.argsort(scores)[::-1][:top_k].tolist()

    def _dense_search(self, query: str, top_k: int) -> List[int]:
        return [r["index"] for r in self.vector_store.query(query, top_k)]

    def _merge(self, sparse_ids: List[int], dense_ids: List[int]) -> List[int]:
        seen, candidates = set(), []
        for idx in sparse_ids + dense_ids:
            if idx not in seen:
                seen.add(idx)
                candidates.append(idx)
        return candidates

    def _rerank(self, query: str, candidates: List[int], top_k: int) -> List[str]:
        pairs = [(query, self.texts[i]) for i in candidates]
        scores = self.reranker.predict(pairs)
        ranked = sorted(zip(scores, candidates), reverse=True)[:top_k]
        return [self.texts[i] for _, i in ranked]

    def search_sum(self, query: str, top_k: int = 5) -> str:
        # 1. Sparse (BM25) + Dense (FAISS)
        sparse_ids = self._sparse_search(query, top_k)
        dense_ids = self._dense_search(query, top_k)

        # 2. Merge
        candidates = self._merge(sparse_ids, dense_ids)

        # 3. Rerank
        top_docs = self._rerank(query, candidates, top_k)

        # 4. LLM
        context = "\n\n".join(top_docs)
        if not context:
            return "no relevant content found"
        prompt = f"""You are Prince Singh. Answer the query as if you are Prince himself, in a friendly and slightly fun chat tone.

Strict rules:
- Use ONLY the information from the context below. Do not add anything not present in the context.
- NEVER invent or guess URLs. Only use URLs that are explicitly present in the context.
- When a URL exists in the context, format it as [Label](url).
- If no URL exists for a term, write it as plain text only. NEVER write [text](no url provided) or [text](#) or any placeholder.
- Be concise.

Context:
{context}

Query: {query}"""
        response = self.llm.invoke([prompt])
        return response.content
        