from fastapi import APIRouter, File, UploadFile
from typing import Dict
from app.models.schemas import ChatRequest, ChatResponse
from app.services.chat import get_chat_response
from app.services.rag import ingest_document

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(req: ChatRequest):
    response_text = await get_chat_response(req.message)
    return ChatResponse(response=response_text)

@router.get("/health")
async def health_check():
    return {"status": "ok"}

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not (file.filename.endswith(".txt") or file.filename.endswith(".pdf")):
        return {"error": "Only .txt and .pdf files are supported for now."}
        
    file_path = f"data/{file.filename}"
    import os
    os.makedirs("data", exist_ok=True)
    
    with open(file_path, "wb") as f:
        f.write(await file.read())
        
    # Trigger RAG Ingestion Pipeline
    chunks_count = await ingest_document(file_path)
    
    return {"message": f"Successfully loaded {file.filename} and created {chunks_count} embedded chunks."}
