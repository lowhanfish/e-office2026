from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DB_URL = f"mysql+pymysql://root:root@localhost:3306/tester"

engine = create_engine(DB_URL)
LocalSession = sessionmaker(autocommit = False, autoflush=False, bind=engine)
Base = declarative_base()



def get_db():
    db = LocalSession()
    try:
        yield db
    except Exception as e:
        print(f"Error koneksi database : {e}")
        raise e
    finally:
        db.close()