from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.session import get_db
from app.models.simpeg_models import RefRiwayat
from app.schemas.simpeg.master.ref_riwayat import RiwayatResponse, RiwayatCreate, RiwayatUpdate
from typing import List


router = APIRouter()

@router.get("/")
async def root():
    """
    Mengambil semua data master Jenis Riwayat
    """
    return {
        "status": "success",
        "module": "Simpeg",
        "category": "Jenis Riwayat",
        "data": [
            {"id": 1, "nama": "xxxxx"},
            {"id": 2, "nama": "yyyyy"}
        ]
    }


@router.post("/read", response_model=List[RiwayatResponse])
async def read_riwayat(db: AsyncSession = Depends(get_db)):

    query = select(RefRiwayat)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model= RiwayatResponse)
async def read_riwayat(payload : RiwayatCreate, db: AsyncSession = Depends(get_db)):
    query = RefRiwayat(
        kode = payload.kode,
        nama = payload.nama,
        create_by = "user.id"
    )
    db.add(query)
    await db.commit()
    await db.refresh(query)
    return query



@router.post("/update/{id}", response_model= RiwayatResponse)
async def read_riwayat(id : str, payload: RiwayatUpdate, db: AsyncSession = Depends(get_db)):
    query = select(RefRiwayat).filter(RefRiwayat.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        HTTPException(status_code=404, detail="Data tidak ditemukan")

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await db.commit()
    await db.refresh(db_data)
    return db_data



@router.post("/delete/{id}")
async def read_riwayat(id : str, db: AsyncSession = Depends(get_db)):
    query = select(RefRiwayat).filter(RefRiwayat.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        HTTPException(status_code=404, detail="Data tidak ditemukan")

    await db.delete(db_data)
    await db.commit()
    await db.refresh(db_data)

    return {"message": f"Ref Riwayat : {db_data.nama}, berhasil dihapus"}
