import os
import sys

from dotenv import load_dotenv


load_dotenv()
sys.path.insert(0, os.path.realpath(os.path.join(os.path.dirname(__file__), "..")))

from app.db.alembic_runner import run_migrations
from app.db.session_office import Base
import app.models.office


run_migrations(Base.metadata, "DB_NAME_OFFICE")
