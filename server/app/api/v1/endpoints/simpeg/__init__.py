from fastapi import APIRouter
from .master import master_router

simpeg_router = APIRouter()


simpeg_router.include_router(
    master_router,
    prefix="/master",
    tags=["SIMPEG - Master Referensi"]
)