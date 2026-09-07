from app.db.factory import create_database


engine, AsyncSessionLocal, Base, get_db = create_database("DB_NAME_EGOV")
