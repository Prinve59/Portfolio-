import os
import pickle
import faiss
import numpy as np
from rank_bm25 import BM25Okapi
from sentence_transformers import SentenceTransformer, CrossEncoder
from groq import Groq
from pathlib import Path

# ── Models (loaded once) ──────────────────────────────────────────────────────
_embedder = SentenceTransformer("all-MiniLM-L6-v2")
_reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")
_groq = Groq(api_key=os.environ["GROQ_API_KEY"])

# ── Persistence paths ─────────────────────────────────────────────────────────
_STORE_DIR = Path(__file__).resolve().parent / "rag_store"
_FAISS_PATH = _STORE_DIR / "faiss.index"
_BM25_PATH = _STORE_DIR / "bm25.pkl"
_STORE_DIR.mkdir(exist_ok=True)

# ── In-memory store ───────────────────────────────────────────────────────────
_documents: list[str] = []
_faiss_index: faiss.IndexFlatIP | None = None
_bm25: BM25Okapi | None = None


def _save() -> None:
    faiss.write_index(_faiss_index, str(_FAISS_PATH))
    with open(_BM25_PATH, "wb") as f:
        pickle.dump((_documents, _bm25), f)


def _load() -> None:
    global _documents, _faiss_index, _bm25
    if _FAISS_PATH.exists() and _BM25_PATH.exists():
        _faiss_index = faiss.read_index(str(_FAISS_PATH))
        with open(_BM25_PATH, "rb") as f:
            _documents, _bm25 = pickle.load(f)


_load()  # auto-load on startup


def index_documents(docs: list[str]) -> None:
    global _documents, _faiss_index, _bm25
    _documents = docs

    # Dense index
    embeddings = _embedder.encode(docs, normalize_embeddings=True).astype("float32")
    _faiss_index = faiss.IndexFlatIP(embeddings.shape[1])
    _faiss_index.add(embeddings)

    # Sparse index
    _bm25 = BM25Okapi([d.lower().split() for d in docs])
    _save()


def _sparse_search(query: str, top_k: int) -> list[int]:
    scores = _bm25.get_scores(query.lower().split())
    return np.argsort(scores)[::-1][:top_k].tolist()


def _dense_search(query: str, top_k: int) -> list[int]:
    q_emb = _embedder.encode([query], normalize_embeddings=True).astype("float32")
    _, indices = _faiss_index.search(q_emb, top_k)
    return indices[0].tolist()


def query(user_query: str, top_k: int = 5) -> dict:
    if not _documents or _faiss_index is None or _bm25 is None:
        raise ValueError("No documents indexed. Call index_documents() first.")

    # 1. Sparse + Dense retrieval
    sparse_ids = _sparse_search(user_query, top_k)
    dense_ids = _dense_search(user_query, top_k)

    # 2. Merge (deduplicate, preserve order)
    seen, candidates = set(), []
    for idx in sparse_ids + dense_ids:
        if idx not in seen:
            seen.add(idx)
            candidates.append(idx)

    # 3. Cross-encoder rerank
    pairs = [(user_query, _documents[i]) for i in candidates]
    scores = _reranker.predict(pairs)
    ranked = sorted(zip(scores, candidates), reverse=True)[:top_k]
    top_docs = [_documents[i] for _, i in ranked]

    # 4. LLM answer
    context = "\n\n".join(f"[{n+1}] {d}" for n, d in enumerate(top_docs))
    response = _groq.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "system", "content": "Answer using only the provided context. Be concise."},
            {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {user_query}"},
        ],
    )
    return {
        "answer": response.choices[0].message.content,
        "sources": top_docs,
    }
