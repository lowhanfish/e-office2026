from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.db.session import get_db
from app.schemas.simpeg.master.ref_status_hidup import RefStatusHidupCreate, RefStatusHidupResponse, RefStatusHidupUpdate
from app.models.simpeg_models import RefStatusHidup

router = APIRouter()

@router.get("/read", response_model=List[RefStatusHidupResponse])
async def read_ref_status_hidup(db:AsyncSession=Depends(get_db)):
    query = select(RefStatusHidup)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/create", response_model=RefStatusHidupResponse)
async def create_ref_status_hidup(payload:RefStatusHidupCreate, db:AsyncSession=Depends(get_db)):
    new_data = RefStatusHidup(
        kode = payload.kode,
        nama = payload.nama,
        created_by = "user.id",
    )
    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data


@router.put("/update/{id}", response_model=RefStatusHidupResponse)
async def update_ref_status_hidup(id:str, payload:RefStatusHidupUpdate, db:AsyncSession=Depends(get_db)):
    query = select(RefStatusHidup).where(RefStatusHidup.id == id)
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


@router.delete("/delete/{id}")
async def delete_ref_status_hidup(id:str, db:AsyncSession = Depends(get_db)):
    query = select(RefStatusHidup).where(RefStatusHidup.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Id dari data yang anda pilih tidak ditemukan")
    
    nama = db_data.nama
    await db.delete(db_data)
    await db.commit()
    return {
        "message" : f"Referensi Status Hidup : '{nama}', telah dihapus"
    }




