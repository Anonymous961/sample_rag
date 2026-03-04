from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OPENROUTER_API_KEY: str = "sk-or-v1-fake-replace-me"
    GENAILAB_API_KEY: str = ""
    LLM_PROVIDER: str = "openrouter" # 'openrouter' or 'genailab'
    
    class Config:
        env_file = ".env"

settings = Settings()
