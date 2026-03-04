import os
from langchain_community.document_loaders import TextLoader, PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain_community.vectorstores import FAISS

# In-memory vector database reference
VECTOR_STORE = None

def get_embeddings_model():
    """Returns the fast, ONNX-based local sentence transformer model for embeddings."""
    return FastEmbedEmbeddings()

async def ingest_document(file_path: str):
    """
    Loads a .txt file, chunks it, embeds it, and saves to FAISS.
    Updates the global VECTOR_STORE.
    """
    global VECTOR_STORE
    
    # 1. Load the file
    if file_path.endswith(".pdf"):
        loader = PyPDFLoader(file_path)
    else:
        loader = TextLoader(file_path)
        
    documents = loader.load()
    
    # 2. Split the text into manageable chunks (~1000 characters)
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )
    chunks = text_splitter.split_documents(documents)
    
    # 3. Create the embeddings and VectorDB
    embeddings_model = get_embeddings_model()
    VECTOR_STORE = FAISS.from_documents(chunks, embeddings_model)
    
    # Optional: Save locally so it persists across restarts
    os.makedirs("data", exist_ok=True)
    VECTOR_STORE.save_local("data/faiss_index")
    
    return len(chunks)

def get_retriever():
    """Returns the FAISS retriever if initialized, else None."""
    global VECTOR_STORE
    
    # Try to load from disk if memory store is empty
    if VECTOR_STORE is None and os.path.exists("data/faiss_index"):
        embeddings_model = get_embeddings_model()
        VECTOR_STORE = FAISS.load_local(
            "data/faiss_index", 
            embeddings_model, 
            allow_dangerous_deserialization=True # Required for local loading
        )
        
    if VECTOR_STORE is not None:
        return VECTOR_STORE.as_retriever(search_kwargs={"k": 3})  # return top 3 chunks
    
    return None
