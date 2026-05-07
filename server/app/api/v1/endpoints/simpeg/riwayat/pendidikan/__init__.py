from fastapi import APIRouter

from . import diklat, kursus, pendidikan_formal

pendidikan_router = APIRouter()


pendidikan_router.include_router(diklat.router, prefix="/diklat")
pendidikan_router.include_router(kursus.router, prefix="/kursus")
pendidikan_router.include_router(pendidikan_formal.router, prefix="/pendidikan_formal")