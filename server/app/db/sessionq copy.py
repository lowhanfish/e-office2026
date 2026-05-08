import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
from typing import AsyncGenerator

load_dotenv()

# Ambil data dari .env
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME")

# URL koneksi khusus untuk MySQL Async
ASYNC_DATABASE_URL = f"mysql+aiomysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# 1. Buat Engine Asinkron
engine = create_async_engine(
    ASYNC_DATABASE_URL,
    echo=True,           # Menampilkan log SQL di terminal (bagus untuk dev)
    pool_pre_ping=True,  # Memastikan koneksi masih hidup sebelum dipakai
)

# 2. Buat Session Factory
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

Base = declarative_base()

# 3. Fungsi untuk digunakan di Route (Dependency Injection)
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()