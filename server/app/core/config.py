from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field



class setting(BaseSettings):
    DB_USER : str
    DB_PASSWORD:str
    DB_HOST:str
    DB_NAME_MAIN:str
    DB_NAME_SIMPEG:str
    SECRET_KEY:str


config_setting = SettingsConfigDict(
    env_file=".env",
    env_file_encoding="utf-8",
    case_sensitive=True
    
)