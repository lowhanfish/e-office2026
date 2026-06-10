from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.db.session import get_db
from app.models.simpeg_models import RefLokasi
from app.schemas.simpeg.master.ref_lokasi import RefLokasiCreate, RefLokasiResponse, RefLokasiUpdate

router = APIRouter()


@router.get("/read", response_model=List[RefLokasiResponse])
async def read_ref_lokasi(db:AsyncSession = Depends(get_db)):
    query = select(RefLokasi)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model=RefLokasiResponse)
async def create_ref_lokasi(payload: RefLokasiCreate, db:AsyncSession = Depends(get_db)):
    new_data = RefLokasi(
        kode = payload.kode,
        nama = payload.nama,
        kanreg_id = payload.kanreg_id,
        ref_lokasi_id = payload.ref_lokasi_id,
        kode_cepat = payload.kode_cepat,
        ref_jns_lokasi_id = payload.ref_jns_lokasi_id,
        created_by = "user.id"
    )

    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data

@router.put("/update/{id}", response_model=RefLokasiResponse)
async def update_ref_lokasi(id:str, payload: RefLokasiUpdate, db:AsyncSession = Depends(get_db)):
    query = select(RefLokasi).where(RefLokasi.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="id dari data yang anda tuju tidak ditemukan")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await db.commit()
    await db.refresh(db_data)
    return db_data


@router.delete("/delete/{id}")
async def delete_ref_lokasi(id:str, db:AsyncSession = Depends(get_db)):
    query = select(RefLokasi).where(RefLokasi.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="id dari data yang anda tuju tidak ditemukan")
    
    nama = db_data.nama
    await db.delete(db_data)
    await db.commit()
    return {
        "message" : f"Referensi Lokasi : '{nama}', telah dihapus"
    }