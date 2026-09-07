"""Compatibility import for the former secondary database session."""

from app.db.session_office import AsyncSessionLocal, Base, engine, get_db


__all__ = ["AsyncSessionLocal", "Base", "engine", "get_db"]
