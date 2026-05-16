from fastapi import APIRouter, Depends, HTTPException
from app.schemas.simpeg.master.ref_jabfung import RefJabfungCreate, RefJabfungResponse, RefJabfungUpdate
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.session import get_db
from app.models.simpeg_models import RefJabatanFungsional
from typing import List

router = APIRouter()

@router.get("/")
async def root():
    """
    Mengambil semua data master Jenis Hukuman Jabatan Fungsional
    """
    return {
        "status": 200,
        "module": "Simpeg",
        "category": "Jabatan Fungsional",
        "message": "Route aktif"
    }

@router.post("/read", response_model=List[RefJabfungResponse])
async def read_jabfung(db:AsyncSession = Depends(get_db)):
    query = select(RefJabatanFungsional)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model=RefJabfungResponse)
async def create_jabfung(payload: RefJabfungCreate, db:AsyncSession = Depends(get_db)):
    
    data = RefJabatanFungsional(
        kode = payload.kode,
        nama = payload.nama,
        create_by = "payload.user"
    )

    db.add(data)
    await db.commit()
    await db.refresh(data)

    return data


@router.post("/update/{id}")
async def update_jabfung(id:str, payload: RefJabfungUpdate, db : AsyncSession = Depends(get_db)):
    query = select(RefJabatanFungsional).filter(RefJabatanFungsional.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await db.commit()
    await db.refresh(db_data)
    return db_data


@router.post("/delete/{id}")
async def delete_jabfung(id:str, db:AsyncSession = Depends(get_db)):
    query = select(RefJabatanFungsional).filter(RefJabatanFungsional.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")

    await db.delete(data_db)
    await db.commit()

    return {
        "message" : f"Referensi jabatan fungsional '{data_db.nama}' telah dihapus"
    }

