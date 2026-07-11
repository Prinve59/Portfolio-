import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from src.data_loader import load_all_documents
from src.embedding import EmbeddingPipeline
from src.vectorstore import FaissVectorStore
from src.search import RagSearch
if __name__=="__main__":
    rag=RagSearch()
    print(rag.search_sum(query="tell me about who is prince",top_k=3))
