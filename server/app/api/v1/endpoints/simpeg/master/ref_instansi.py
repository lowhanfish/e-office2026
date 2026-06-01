from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas.simpeg.master.ref_instansi import InstansiCreate, InstansiResponse, InstansiUpdate
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from sqlalchemy.future import select
from app.models.simpeg_models import Instansi

router = APIRouter()



@router.get("/read", response_model=List[InstansiResponse])
async def read_Instansi(db:AsyncSession = Depends(get_db)):
    query = select(Instansi)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model=InstansiResponse)
async def create_Instansi(payload : InstansiCreate, db:AsyncSession = Depends(get_db)):
    query = Instansi(
        kode = payload.kode,
        kode_cepat = payload.kode_cepat,
        nama = payload.nama,
        jenis = payload.jenis,
        jenis_instansi_id = payload.jenis_instansi_id,
        created_by = payload.created_by,
    )

    db.add(query)
    await db.commit()
    await db.refresh(query)
    return query


@router.put("/update/{id}", response_model=InstansiResponse)
async def update_Instansi(id:str, payload: InstansiUpdate, db: AsyncSession = Depends(get_db)):
    query = select(Instansi).filter(Instansi.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="id data yang anda pilih tidak di temukan")

    update_data = payload.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await db.commit()
    await db.refresh(db_data)
    return db_data


@router.delete("/delete/{id}")
async def delete_Instansi(id:str, db: AsyncSession = Depends(get_db)):
    query = select(Instansi).filter(Instansi.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="id data yang anda pilih tidak di temukan")
    
    await db.delete(db_data)
    await db.commit()

    return {
        "message" : f"Referensi Instansi '{db_data.nama}' telah dihapus"
    }