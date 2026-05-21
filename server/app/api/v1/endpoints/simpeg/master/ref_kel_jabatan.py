from fastapi import APIRouter
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.simpeg_models import KelJabatan
from typing import List

router = APIRouter()


@router.get("/")
async def root():
    """
    Mengambil semua data master Jenis Kelompok Jabatan
    """
    return {
        "status": "success",
        "module": "Simpeg",
        "category": "Kelompok Jabatan",
        "data": [
            {"id": 1, "nama": "xxxxx"},
            {"id": 2, "nama": "yyyyy"}
        ]
    }


@router.post("/read")
async def create_KelJabatan():
    pass

@router.post("/create")
async def create_KelJabatan():
    pass

@router.post("/update")
async def create_KelJabatan():
    pass

@router.post("/delete")
async def create_KelJabatan():
    pass