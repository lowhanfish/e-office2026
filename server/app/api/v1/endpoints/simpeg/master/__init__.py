from fastapi import APIRouter
from . import esselon, agama

master_router = APIRouter()

master_router.include_router(
    esselon.router,
    prefix='/esselon',
    tags=["SIMPEG - Master Esselon"]
)

master_router.include_router(
    agama.router,
    prefix="/agama",
    tags=["SIMPEG - Master Agama"]
)