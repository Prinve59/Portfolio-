from pathlib import Path
from typing import List,Any
from langchain_community.document_loaders import PyPDFLoader,TextLoader,CSVLoader,Docx2txtLoader,JSONLoader,AsyncHtmlLoader
from langchain_community.document_loaders.excel import UnstructuredExcelLoader
import os 
from dotenv import load_dotenv
from github import Github

_DEFAULT_DATA_DIR = Path(__file__).resolve().parent.parent / "data"

def load_all_documents(data_dir: str = None) -> List[Any]:
    data_path = Path(data_dir).resolve() if data_dir else _DEFAULT_DATA_DIR
    print(f"[DEBUG] Data Path:{data_path}")
    documents=[]
    #pdf files
    pdf_files=list(data_path.glob('**/*.pdf'))
    print(f"[DEBUG] found {len(pdf_files)} pdf files{[str(f) for f in pdf_files]}")
    for pdf_file in pdf_files:
        print(f"[DEBUG] loading pdf :{pdf_file}")
        try:
            loader=PyPDFLoader(str(pdf_file))
            loaded=loader.load()
            print(f"[DEBUG] loaded {len(loaded)} pdf docs from {pdf_file}")
            documents.extend(loaded)
        except Exception as e:
            print(f"[ERROR] failed to load {pdf_file}:{e}")

    #txt files
    txt_files=list(data_path.glob('**/*.txt'))
    print(f"[DEBUG] found {len(txt_files)} txt files{[str(f) for f in txt_files]}")
    for txt_file in txt_files:
        print(f"[DEBUG] loading txt :{txt_file}")
        try:
            loader=TextLoader(str(txt_file))
            loaded=loader.load()
            print(f"[DEBUG] loaded {len(loaded)} txt docs from {txt_file}")
            documents.extend(loaded)
        except Exception as e:
            print(f"[ERROR] failed to load {txt_file}:{e}")

    # load_dotenv()
    # github_api = os.getenv("GITHUB_API_KEY")
    # g = Github(github_api)
    # username = g.get_user().login
    # repo_names = [
    #     "RAG-Retrieval-Augumented-Generation-", "Noise-Compression", "Ecomotion",
    #     "Verifund", "true-chain-play", "ICD-11-TM-2-Name-generalization",
    #     "Movie-Recommendation-", "UniBuddy", "BunkIt", "StayHomez"
    # ]
    # for repo_name in repo_names:
    #     try:
    #         repo = g.get_repo(f"{username}/{repo_name}")
    #         contents = repo.get_contents("")
    #         urls = []
    #         while contents:
    #             item = contents.pop(0)
    #             if item.type == "dir":
    #                 contents.extend(repo.get_contents(item.path))
    #             elif item.name.endswith((".md", ".txt", ".rst", ".html")):
    #                 urls.append(item.html_url)
    #         if urls:
    #             loader = AsyncHtmlLoader(urls)
    #             loaded = loader.load()
    #             print(f"[DEBUG] loaded {len(loaded)} github docs from {repo_name}")
    #             documents.extend(loaded)
    #     except Exception as e:
    #         print(f"[ERROR] failed to load github repo {repo_name}: {e}")

    return documents