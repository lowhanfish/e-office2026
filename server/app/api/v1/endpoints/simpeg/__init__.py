from fastapi import APIRouter
from .master import master_router
from .riwayat import pendidikan_router

simpeg_router = APIRouter()


simpeg_router.include_router(
    master_router,
    prefix="/master",
    tags=["SIMPEG - Master Referensi"]
)

simpeg_router.include_router(
    pendidikan_router,
    prefix="/riwayat"
    tags=["SIMPEG - Riwayat Pendidikan"]
)