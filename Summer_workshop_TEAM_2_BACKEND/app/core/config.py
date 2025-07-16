from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    APP_NAME: str = "Gift Recommendation Service"
    APP_VERSION: str = "1.0.0"
    OPENAI_API_KEY: str = ""
    GEMINI_API_KEY: str = ""

    model_config = SettingsConfigDict(envfile=".env")

@lru_cache()
def get_settings() -> Settings:
    return Settings()
