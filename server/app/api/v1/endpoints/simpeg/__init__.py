from fastapi import APIRouter
from .master import master_router
from .riwayat import riwayat_router
from .auth import auth_router

simpeg_router = APIRouter()


simpeg_router.include_router(
    auth_router,
    prefix="/auth",
    tags=["SIMPEG - AUTH"]
)

simpeg_router.include_router(
    master_router,
    prefix="/master",
    tags=["SIMPEG - Master Referensi"]
)

simpeg_router.include_router(
    riwayat_router,
    prefix="/riwayat",
    tags=["SIMPEG - Riwayat"]
)