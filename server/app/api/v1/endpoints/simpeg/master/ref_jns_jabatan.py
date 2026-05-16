from fastapi import APIRouter, HTTPException, Depends
from app.schemas.simpeg.master.ref_jns_jabatan import JenisJabatanCreate, JenisJabatanResponse, JenisJabatanUpdate
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.models.simpeg_models import JenisJabatan
from sqlalchemy.future import select

router = APIRouter()


@router.get("/")
async def root():
    """
    Mengecek Router Jenis Jabatan
    """
    return {
        "status": "success",
        "module": "Simpeg",
        "category": "Jumpun Jabatan JF",
        "data": "active"
    }


@router.post("/read", response_model = List[JenisJabatanResponse])
async def read_JenisJabatan(db:AsyncSession = Depends(get_db)):
    query = select(JenisJabatan)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/create", response_model=JenisJabatanResponse)
async def read_JenisJabatan(payload : JenisJabatanCreate, db:AsyncSession = Depends(get_db)):
    new_data = JenisJabatan(
        kode = payload.kode,
        nama = payload.nama,
        created_by = "user.created_by"
    )

    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data


@router.post("/update")
async def read_JenisJabatan():
    pass

@router.post("/delete")
async def read_JenisJabatan():
    pass