from fastapi import APIRouter, Depends, HTTPException
from app.schemas.simpeg.master.ref_satker import SatkerCreat, SatkerResponse, SatkerUpdate
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.simpeg_models import Satker
from app.db.session import get_db


router = APIRouter()

@router.get("/read", response_model=List[SatkerResponse])
async def read_satker(db: AsyncSession = Depends(get_db)):
    query = select(Satker)
    result = await db.execute(query)
    return result.scalars().all()




@router.post("/creat", response_model=SatkerResponse)
async def create_satker(payload:SatkerCreat, db: AsyncSession = Depends(get_db)):
    query = Satker(
        kode = payload.kode,
        nama = payload.nama,
        instansi_id = payload.instansi_id,
        created_by = "user.id"
    )
    db.add(query)
    await db.commit()
    await db.refresh(query)

    return query


@router.put("/update/{id}")
async def update_satker(id:str, payload : SatkerUpdate, db: AsyncSession = Depends(get_db)):
    query = select(Satker).filter(Satker.id == id)
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
async def root(id:str, db: AsyncSession = Depends(get_db)):

    query = select(Satker).filter(Satker.id == id)
    result = await db.execute(query)

    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="id dari data yang anda tuju tidak ditemukan")
    
    last_data = db_data

    await db.delete(db_data)
    await db.commit()


    return {
        "message" : f"Data Satker {last_data.nama} telah dihapus",
        "satus" : 200
    }

