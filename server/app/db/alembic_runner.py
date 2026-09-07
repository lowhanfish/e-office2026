import asyncio
import os
from logging.config import fileConfig

from alembic import context
from sqlalchemy import URL, pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import create_async_engine


def run_migrations(target_metadata, database_env: str) -> None:
    config = context.config

    if (
        config.config_file_name is not None
        and config.file_config.has_section("loggers")
    ):
        fileConfig(config.config_file_name)

    database_name = os.getenv(database_env)
    if not database_name:
        raise RuntimeError(f"{database_env} belum diset di environment (.env)")

    database_url = URL.create(
        drivername="mysql+aiomysql",
        username=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=int(os.getenv("DB_PORT", "3306")),
        database=database_name,
    )

    def run_offline() -> None:
        context.configure(
            url=database_url.render_as_string(hide_password=False),
            target_metadata=target_metadata,
            literal_binds=True,
            dialect_opts={"paramstyle": "named"},
        )

        with context.begin_transaction():
            context.run_migrations()

    def run_with_connection(connection: Connection) -> None:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()

    async def run_online_async() -> None:
        connectable = create_async_engine(
            database_url,
            poolclass=pool.NullPool,
        )

        async with connectable.connect() as connection:
            await connection.run_sync(run_with_connection)

        await connectable.dispose()

    if context.is_offline_mode():
        run_offline()
    else:
        asyncio.run(run_online_async())
