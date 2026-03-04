from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OPENROUTER_API_KEY: str = "sk-or-v1-fake-replace-me"
    
    class Config:
        env_file = ".env"

settings = Settings()
