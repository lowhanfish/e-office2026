from fastapi import APIRouter, Depends, HTTPException
from app.schemas.simpeg.master.ref_jenis_instansi import RefJenisInstansiCreate, RefJenisInstansiResponse, RefJenisInstansiUpdate
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from sqlalchemy.future import select
from app.models.simpeg.master.models import JenisInstansi


router = APIRouter()


@router.get("/read", response_model=List[RefJenisInstansiResponse])
async def read_JenisInstansi(
    db:AsyncSession = Depends(get_db)
):
    query = select(JenisInstansi)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create")
async def create_JenisInstansi(
    payload:RefJenisInstansiCreate, 
    db:AsyncSession = Depends(get_db)
):
    new_data = JenisInstansi(
        kode = payload.kode,
        nama = payload.nama,
        created_by = "user.id",
    )

    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)

    return new_data

@router.put("/update/{id}", response_model=RefJenisInstansiResponse)
async def update_JenisInstansi(
    id:str, 
    payload:RefJenisInstansiUpdate, 
    db:AsyncSession = Depends(get_db)
):
    
    query = select(JenisInstansi).where(JenisInstansi.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="id dari item yang akan di edit tidak ditemukan")
    
    update_data = payload.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        if hasattr(data_db, key):
            setattr(data_db, key, value, )

    await db.commit()
    await db.refresh(data_db)
    
    return data_db


@router.delete("/delete/{id}")
async def delete_JenisInstansi(id:str, db:AsyncSession = Depends(get_db)):
    query = select(JenisInstansi).where(JenisInstansi.id == id)
    result = await db.execute(query)
    delete_data = result.scalar_one_or_none()

    if not delete_data:
        raise HTTPException(status_code=404, detail="id dari item yang akan di edit tidak ditemukan")
    
    nama = delete_data.nama
    await db.delete(delete_data)
    await db.commit()

    return {
        "message" : f"Referensi Jenis Instansi '{nama}' telah dihapus"
    } 

