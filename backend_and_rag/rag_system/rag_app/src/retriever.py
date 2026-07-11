import os
import numpy as np
from typing import List, Any
from rank_bm25 import BM25Okapi
from sentence_transformers import CrossEncoder
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

_reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")
_groq = Groq(api_key=os.getenv("GROQ_API_KEY"))


class HybridRetriever:
    def __init__(self, chunks: List[Any]):
        self.chunks = chunks
        texts = [c.page_content for c in chunks]
        self.bm25 = BM25Okapi([t.lower().split() for t in texts])
        print(f"[INFO] BM25 index built over {len(texts)} chunks")

    def sparse_search(self, query: str, top_k: int) -> List[int]:
        scores = self.bm25.get_scores(query.lower().split())
        return np.argsort(scores)[::-1][:top_k].tolist()

    def merge(self, sparse_ids: List[int], dense_ids: List[int]) -> List[int]:
        seen, candidates = set(), []
        for idx in sparse_ids + dense_ids:
            if idx not in seen:
                seen.add(idx)
                candidates.append(idx)
        return candidates

    def rerank(self, query: str, candidates: List[int], top_k: int) -> List[str]:
        pairs = [(query, self.chunks[i].page_content) for i in candidates]
        scores = _reranker.predict(pairs)
        ranked = sorted(zip(scores, candidates), reverse=True)[:top_k]
        return [self.chunks[i].page_content for _, i in ranked]

    def answer(self, query: str, top_docs: List[str]) -> dict:
        context = "\n\n".join(f"[{n+1}] {d}" for n, d in enumerate(top_docs))
        response = _groq.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": "Answer using only the provided context. Be concise."},
                {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {query}"},
            ],
        )
        return {"answer": response.choices[0].message.content, "sources": top_docs}
