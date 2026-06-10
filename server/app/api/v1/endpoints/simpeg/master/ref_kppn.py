from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.db.session import get_db
from app.schemas.simpeg.master.ref_kppn import RefKPPNCreate, RefKPPNResponse, RefKPPNUpdate
from app.models.simpeg_models import RefKPPN


router = APIRouter()


@router.get("/read", response_model=RefKPPNResponse)
async def read_ref_kppn(db:AsyncSession=Depends(get_db)):
    query = select(RefKPPN)
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/create", response_model=RefKPPNResponse)
async def create_ref_kppn(payload:RefKPPNCreate,db:AsyncSession=Depends(get_db)):
    new_data = RefKPPN(
        kode = payload.kode,
        nama = payload.nama,
        created_by = "user.id"
    )
    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data



@router.get("/update/{id}", response_model=RefKPPNResponse)
async def update_ref_kppn(id:str, payload:RefKPPNCreate, db:AsyncSession=Depends(get_db)):
    query = select(RefKPPN).where(RefKPPN.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Id dari data yang anda pilih tidak ditemukan")

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await db.commit()
    await db.refresh(db_data)
    return db_data


@router.get("/delete/{id}")
async def delete_ref_kppn(id:str, db:AsyncSession=Depends(get_db)):
    query = select(RefKPPN).where(RefKPPN.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Id dari data yang anda pilih tidak ditemukan")
    
    nama = db_data.nama
    await db.delete(db_data)
    await db.commit()
    return {
        "message" : f"Referensi KPPN : '{nama}', telah dihapus"
    }