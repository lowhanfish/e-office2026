import os
from typing import AsyncGenerator

from dotenv import load_dotenv
from sqlalchemy import URL
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase


load_dotenv()


def create_database(database_env: str):
    """Create one isolated engine, session factory, Base, and FastAPI dependency."""
    database_name = os.getenv(database_env)
    if not database_name:
        raise RuntimeError(f"Environment variable {database_env} belum diset")

    database_url = URL.create(
        drivername="mysql+aiomysql",
        username=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=int(os.getenv("DB_PORT", "3306")),
        database=database_name,
    )

    engine = create_async_engine(
        database_url,
        echo=os.getenv("DB_ECHO", "false").lower() == "true",
        pool_pre_ping=True,
        pool_size=5,
        max_overflow=5,
        pool_recycle=3600,
    )

    session_factory = async_sessionmaker(
        bind=engine,
        class_=AsyncSession,
        expire_on_commit=False,
    )

    class Base(DeclarativeBase):
        pass

    async def get_db() -> AsyncGenerator[AsyncSession, None]:
        async with session_factory() as session:
            try:
                yield session
            except Exception:
                await session.rollback()
                raise

    return engine, session_factory, Base, get_db
