import asyncio
import os
import sys
from logging.config import fileConfig

from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import async_engine_from_config, create_async_engine


from alembic import context

from dotenv import load_dotenv
load_dotenv()

# --- [Agar folder 'app' terbaca oleh Python] ---
sys.path.insert(0, os.path.realpath(os.path.join(os.path.dirname(__file__), '..')))

# --- [Import Base dan Model Anda] ---
from app.db.session import Base

# Import semua model yang ada di metadata
# Tujuannya agar target_metadata terisi penuh untuk autogenerate.
from app.models import simpeg_models

# (opsional) ekspor nama class agar lebih jelas saat debugging
Agama = simpeg_models.Agama
Esselon = simpeg_models.Esselon
JenisJabatan = simpeg_models.JenisJabatan
JnsHukdis = simpeg_models.JnsHukdis
RumpunJabatan = simpeg_models.RumpunJabatan


config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# --- [Target metadata agar autogenerate bekerja] ---
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection: Connection) -> None:
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations(db_url: str) -> None:
    """Jalankan migrasi menggunakan db_url yang sudah dibangun saat runtime."""

    connectable = create_async_engine(
        db_url,
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()



def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    
    # Ambil data dari .env sesuai variabel Anda
    user = os.getenv("DB_USER")
    pw = os.getenv("DB_PASSWORD")
    host = os.getenv("DB_HOST")
    port = os.getenv("DB_PORT", "3306")
    db = os.getenv("DB_NAME_SIMPEG") or os.getenv("DB_NAME")

    if not db:
        raise RuntimeError(
            "DB_NAME_SIMPEG atau DB_NAME belum diset di environment (.env)"
        )

    # Buat URL dengan driver aiomysql
    url = f"mysql+aiomysql://{user}:{pw}@{host}:{port}/{db}"

    
    # Masukkan URL ini ke dalam config Alembic secara runtime
    target_config = config.get_section(config.config_ini_section)
    target_config["sqlalchemy.url"] = url

    asyncio.run(run_async_migrations(url))



if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()