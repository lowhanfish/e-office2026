import os
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from typing import AsyncGenerator
 

load_dotenv()
# Get Data From env
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME_SIMPEG")


# Create Connection to MySql
DB_CONNECTION = f"mysql+aiomysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Create Async Engine
engine = create_async_engine(
    DB_CONNECTION,
    echo=True,
    pool_pre_ping = True
)

# Create Session Maker

AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Create Declarative Base
class Base(DeclarativeBase):
    pass


# Create Dependency Injection
async def get_db() -> AsyncGenerator[AsyncSession, None]:
   async with AsyncSessionLocal() as session:
        try:
             yield session
        except Exception as e:
            print(f"Error DB : {e}")
        finally:
            await session.close()