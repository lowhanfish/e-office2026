from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from sqlalchemy.future import select
from app.models.simpeg.master.models import JenisInstansiId
from typing import List
from app.schemas.simpeg.master.ref_jenis_instansi_id import RefJenisInstansiIdCreate, RefJenisInstansiIdResponse, RefJenisInstansiIdUpdate
# from sqlalchemy.sql import func

router = APIRouter()

@router.get("/read", response_model=List[RefJenisInstansiIdResponse])
async def read_JenisInstansiId(db:AsyncSession = Depends(get_db)):
    query = select(JenisInstansiId)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model=RefJenisInstansiIdResponse)
async def create_JenisInstansiId(
    payload:RefJenisInstansiIdCreate, 
    db:AsyncSession = Depends(get_db)
):
    new_data = JenisInstansiId(
        kode = payload.kode,
        nama = payload.nama,
        created_by = "payload.created_by",
    )
    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)

    return new_data

@router.put("/update/{id}", response_model=RefJenisInstansiIdResponse)
async def update_JenisInstansiId(
    id:str, 
    payload:RefJenisInstansiIdUpdate, 
    db:AsyncSession = Depends(get_db)
):

    query = select(JenisInstansiId).where(JenisInstansiId.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="id dari item yang akan di edit tidak ditemukan")

    update_data = payload.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        if hasattr(data_db, key):
            setattr(data_db, key, value)

    await db.commit()
    await db.refresh(data_db)
    return data_db 


@router.delete("/delete/{id}")
async def delete_JenisInstansiId(id:str, db:AsyncSession = Depends(get_db)):
    query = select(JenisInstansiId).where(JenisInstansiId.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="id dari data yang anda ingin hapus tidak ditemukan")
    
    nama = data_db.nama
    await db.delete(data_db)
    await db.commit()

    return {
        "message" : f"Referensi Jenis InstansiId '{nama}' telah dihapus"
    }  