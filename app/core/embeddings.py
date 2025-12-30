from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from pathlib import Path

CHROMA_DIR = Path("chroma_data")
CHROMA_DIR.mkdir(exist_ok=True)

embedding_function = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

vector_store = Chroma(
    collection_name="mentors",
    embedding_function=embedding_function,
    persist_directory=str(CHROMA_DIR)
)
