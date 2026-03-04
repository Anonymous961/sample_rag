from langchain_openai import ChatOpenAI
from app.core.config import settings
from app.services.rag import get_retriever

# Initialize GenAILab ChatOpenAI client
# You may need to tweak the model name depending on what models genailab endpoints offer
llm = ChatOpenAI(
    base_url="https://genailab.tcs.in/v1", 
    api_key=settings.GENAILAB_API_KEY,
    model="gpt-3.5-turbo", 
)

async def get_genailab_response(message: str) -> str:
    try:
        context_str = ""
        retriever = get_retriever()
        
        if retriever:
            docs = retriever.invoke(message)
            context_chunks = [doc.page_content for doc in docs]
            context_str = "Context information is below.\n---------------------\n" + \
                          "\n\n".join(context_chunks) + \
                          "\n---------------------\nGiven the context information above and not prior knowledge, answer the query."
                          
        system_prompt = "You are Nexus AI, a helpful, intelligent assistant. Keep responses helpful and concise.\n"
        if context_str:
            system_prompt += f"\n{context_str}"
            
        messages = [
            ("system", system_prompt),
            ("human", message),
        ]
        
        response = await llm.ainvoke(messages)
        return response.content
        
    except Exception as e:
        print(f"Error calling GenAILab API: {str(e)}")
        return "Sorry, I am having trouble connecting to the GenAILab brain right now."
