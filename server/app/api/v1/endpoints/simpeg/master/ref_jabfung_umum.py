from fastapi import APIRouter, Depends, HTTPException
from app.schemas.simpeg.master.ref_jabfung_umum import RefJabatanFungsionalUmumCreate, RefJabatanFungsionalUmumResponse, RefJabatanFungsionalUmumUpdate
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.simpeg_models import RefJabatanFungsionalUmum
from app.db.session import get_db
from typing import List

router = APIRouter()

@router.get("/read",response_model=List[RefJabatanFungsionalUmumResponse])
async def read_RefJabatanFungsionalUmum(db: AsyncSession = Depends(get_db)):
    query = select(RefJabatanFungsionalUmum)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model=RefJabatanFungsionalUmumResponse)
async def read_RefJabatanFungsionalUmum(payload : RefJabatanFungsionalUmumCreate, db :AsyncSession = Depends(get_db)):
    query = RefJabatanFungsionalUmum(
        nama = payload.nama,
        kode = payload.kode,
        kode_cepat = payload.kode_cepat,
        status = payload.status,
        created_by = "user.id"
    )
    db.add(query)
    await db.commit()
    await db.refresh(query)
    return query


@router.put("/update/{id}", response_model=RefJabatanFungsionalUmumResponse)
async def read_RefJabatanFungsionalUmum(id:str, payload : RefJabatanFungsionalUmumUpdate, db:AsyncSession = Depends(get_db)):
    query = select(RefJabatanFungsionalUmum).filter(RefJabatanFungsionalUmum.id == id)
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
async def read_RefJabatanFungsionalUmum(id:str, db:AsyncSession = Depends(get_db)):
    query = select(RefJabatanFungsionalUmum).filter(RefJabatanFungsionalUmum.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="id data yang anda pilih tidak ditemukan")
    
    await db.delete(db_data)
    await db.commit()

    return {
        "message" : f"Referensi jabatan fungsional umum '{db_data.nama}' telah dihapus"
    }