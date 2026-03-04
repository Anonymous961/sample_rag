from openai import AsyncOpenAI
from app.core.config import settings
from app.services.rag import get_retriever

# Initialize OpenRouter Async Client
openai_client = AsyncOpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=settings.OPENROUTER_API_KEY,
)

async def get_chat_response(message: str) -> str:
    try:
        # Retrieve context if a document has been loaded
        context_str = ""
        retriever = get_retriever()
        
        if retriever:
            # We must use invoke or get_relevant_documents
            docs = retriever.invoke(message)
            context_chunks = [doc.page_content for doc in docs]
            context_str = "Context information is below.\n---------------------\n" + \
                          "\n\n".join(context_chunks) + \
                          "\n---------------------\nGiven the context information above and not prior knowledge, answer the query."
                          
        system_prompt = "You are Nexus AI, a helpful, intelligent assistant. Keep responses helpful and concise.\n"
        if context_str:
            system_prompt += f"\n{context_str}"

        response = await openai_client.chat.completions.create(
            model="openai/gpt-oss-20b:free",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message}
            ]
        )
        return response.choices[0].message.content
        
    except Exception as e:
        print(f"Error calling OpenRouter API: {str(e)}")
        return "Sorry, I am having trouble connecting to my AI brain right now."
