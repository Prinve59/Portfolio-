from django.http import JsonResponse

def health(request):
    return JsonResponse({"status": "ok"})

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from pathlib import Path
from rag_app.src.search import RagSearch

_STORE_DIR = str(Path(__file__).resolve().parent / "rag_store")
_rag = RagSearch(persist_dir=_STORE_DIR)


@csrf_exempt
def index(request):
    global _rag
    _rag = RagSearch(persist_dir=_STORE_DIR, force_rebuild=True)
    return JsonResponse({"indexed": len(_rag.texts)})


@csrf_exempt
def ask(request):
    if request.method == "GET":
        user_query = request.GET.get("query", "").strip()
    else:
        user_query = json.loads(request.body).get("query", "").strip()
    if not user_query:
        return JsonResponse({"error": "Query is required."})
    return JsonResponse({"answer": _rag.search_sum(user_query, top_k=5)})
