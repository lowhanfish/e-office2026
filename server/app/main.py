from fastapi import FastAPI
from app.models.absensi.data_master import JenisApel, JenisApelPeserta, JenisIzin
from app.models.absensi.presensi import Absensi, AbsensiApel
from app.db.maindb import Base, engine
import logging
from contextlib import asynccontextmanager


logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan (app:FastAPI):
    logger.info("Check and Create Database")
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("Semua tabel berhasil diperiksa/dibuat.")
    except Exception as e:
        logger.error(f"Error : {e}")
    
    yield
    logger.info("server deactivated")

app = FastAPI(
    title="e-Office",
    version="3.0",
    lifespan=lifespan
)

@app.get("/")
async def root():
    return {
        "message": "server active",
        "status": 200
    }

# from fastapi import FastAPI
# from contextlib import asynccontextmanager
# import logging

# from app.db.maindb import Base, engine
# from app.models.absensi.data_master import JenisApel, JenisApelPeserta, JenisIzin

# logger = logging.getLogger(__name__)

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     logger.info("Check and create table database Absensi")
#     try:
#         Base.metadata.create_all(bind=engine)
#     except Exception as e:
#         logger.error(f"Error creating tables: {e}")
    
#     yield
    
#     logger.info("App deactivated")

# app = FastAPI(
#     title="e-Office Konsel",
#     version="3.0",
#     lifespan=lifespan
# )

# @app.get("/")
# def root():
#     return {
#         "message": "server active",
#         "status": 200
#     }