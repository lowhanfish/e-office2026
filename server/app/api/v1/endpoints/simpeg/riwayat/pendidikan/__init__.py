from fastapi import APIRouter

from . import diklat, kursus, pendidikan_formal

pendidikan_router = APIRouter()


pendidikan_router.include_router(diklat.router, prefix="/diklat", tags=["Riwayat Diklat"])
pendidikan_router.include_router(kursus.router, prefix="/kursus", tags=["Riwayat Kursus"])
pendidikan_router.include_router(pendidikan_formal.router, prefix="/pendidikan_formal", tags=["Riwayat Pnedidikan Formal"])