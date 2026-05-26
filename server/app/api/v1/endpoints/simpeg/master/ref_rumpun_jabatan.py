from fastapi import APIRouter, Depends, HTTPException
from app.schemas.simpeg.master.ref_rumpun_jabatan import ResponseRumpunJabatan, CreateRumpunJabatan, UpdateRumpunJabatan
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from typing import List
from sqlalchemy.future import select
from app.models.simpeg_models import RumpunJabatan


router = APIRouter()

@router.get("/")
async def root():
    """
    Mengecek Router Rumpun Jabatan
    """
    return {
        "status": "success",
        "module": "Simpeg",
        "category": "Jumpun Jabatan",
        "data": "active"
    }

@router.post("/read", response_model=List[ResponseRumpunJabatan])
async def read_RumpunJabatan(db : AsyncSession = Depends(get_db)):
    query = select(RumpunJabatan)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model=ResponseRumpunJabatan)
async def read_RumpunJabatan(payload : CreateRumpunJabatan, db: AsyncSession = Depends(get_db)):
    new_data = RumpunJabatan(
        kode = payload.kode,
        nama = payload.nama,
        kode_cepat = payload.kode_cepat,
        created_by = "user.created_by"
    )

    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data


@router.post("/update/{id}")
async def read_RumpunJabatan(id:str, payload : UpdateRumpunJabatan, db: AsyncSession = Depends(get_db)):
    query = select(RumpunJabatan).filter(RumpunJabatan.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data():
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await db.commit()
    await db.refresh(db_data)
    return db_data


@router.post("/delete/{id}")
async def read_RumpunJabatan(id:str, db: AsyncSession = Depends(get_db)):
    query = select(RumpunJabatan).filter(RumpunJabatan.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")
    
    await db.delete(db_data)
    await db.commit()
    return {"message": f"Esselon {db_data.nama} berhasil dihapus"}

