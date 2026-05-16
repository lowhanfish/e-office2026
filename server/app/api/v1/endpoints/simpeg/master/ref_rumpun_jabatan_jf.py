from fastapi import APIRouter, Depends, HTTPException
from app.schemas.simpeg.master.ref_rumpun_jabatan_jf import CreateRumpunJabatanJF, ResponseRumpunJabatanJF, UpdateRumpunJabatanJF
from typing import List
from app.db.session import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.simpeg_models import RumpunJabatanJF

router = APIRouter()

@router.get("/")
async def root():
    """
    Mengecek Router Rumpun Jabata
    """
    return {
        "status": "success",
        "module": "Simpeg",
        "category": "Jumpun Jabatan JF",
        "data": "active"
    }


@router.post("/read", response_model=List[ResponseRumpunJabatanJF])
async def read_RumpunJabatanJF(db: AsyncSession = Depends(get_db)):
    query = select(RumpunJabatanJF)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model=ResponseRumpunJabatanJF)
async def create_RumpunJabatanJF(payload : CreateRumpunJabatanJF, db:AsyncSession = Depends(get_db)):
    new_data = RumpunJabatanJF(
        kode = payload.kode,
        kode_rumpun = payload.kode_rumpun,
        nama = payload.nama,
        created_by = "user.created_by"
    )
    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data

@router.post("/update/{id}", response_model=ResponseRumpunJabatanJF)
async def update_RumpunJabatanJF(id:str, payload: UpdateRumpunJabatanJF, db:AsyncSession = Depends(get_db)):
    query = select(RumpunJabatanJF).filter(RumpunJabatanJF.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code= 404, detail="data not found")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(data_db, key):
            setattr(data_db, key, value)

    await db.commit()
    await db.refresh(data_db)
    return data_db

@router.post("/delete/{id}")
async def delete_RumpunJabatanJF(id:str, db:AsyncSession = Depends(get_db)):
    query = select(RumpunJabatanJF).filter(RumpunJabatanJF.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="data not found")
    
    nama = data_db.nama
    await db.delete(data_db)
    await db.commit()

    return {"message": f"Ref RumpunJabatanJF : {nama}, berhasil dihapus"}