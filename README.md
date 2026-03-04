# Base RAG Project

A lightweight, local-first Retrieval-Augmented Generation (RAG) platform built for hackathons. This project provides a complete stack to chat with your own PDF and TXT data using powerful open-source LLMs without the overhead of massive PyTorch installations.

## Architecture Stack
* **Frontend:** React, Vite, TailwindCSS (Responsive Chat UI with inline File Uploader)
* **Backend:** FastAPI (Modularized Application Structure)
* **LLM Engine:** OpenRouter API (Using `openai/gpt-oss-20b:free`)
* **Retriever:** LangChain
* **Embeddings:** FastEmbed (ONNX Runtime, lightweight and fast)
* **Vector Database:** FAISS CPU

## Features
* Upload `.txt` and `.pdf` files directly through the web UI inline with the chat input.
* Automatic text chunking and instantaneous local vector generation.
* Real-time conversational interface with streaming UI concepts (typing dots) and seamless context injection.

## Prerequisites
* Python 3.9+
* Node.js v16+ (or higher)

## Installation Guide

### 1. Setting Up the Backend
Navigate to the backend directory, install the Python requirements, and set up your OpenRouter API Key.

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # (On Windows use `venv\Scripts\activate`)
pip install -r requirements.txt
```

Create an environment configuration file:
Create a `.env` file inside the `backend/` directory with your OpenRouter key:
```env
OPENROUTER_API_KEY=your_super_secret_openrouter_api_key_here
```

### 2. Setting Up the Frontend
Navigate into the frontend directory and install the Node modules.

```bash
cd frontend
npm install
```

## Running the Application

You will need two terminal windows running simultaneously to serve both sides of the application.

### Start the Backend Server (Terminal 1)
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```
The FastAPI backend will now be available locally on `http://localhost:8000`.

### Start the Frontend Server (Terminal 2)
```bash
cd frontend
npm run dev
```
The React frontend will be available locally on `http://localhost:5173`.

## How to use
1. Open up your web browser to `http://localhost:5173`.
2. To train the AI on your data, click the "Paperclip" icon located inside the chat box text input field.
3. Select a `.pdf` or a `.txt` file.
4. Wait for the "Training knowledge base..." spinner to finish and notify you of success.
5. The text vectors have now been embedded into the `backend/data/` FAISS local database.
6. Type a message in the chat! The backend will automatically retrieve pages or chunks relevant to your prompt and inject them into the OpenRouter LLM context to ground the answers.
