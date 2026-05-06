from fastapi import APIRouter
from .pendidikan import pendidikan_router
riwayat_router = APIRouter()


riwayat_router.include_router(
    pendidikan_router,
    prefix="/pendidikan"
)