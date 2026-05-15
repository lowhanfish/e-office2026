from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.session import get_db
from app.schemas.simpeg.master.ref_hukdis import HukdisCreate, HukdisUpdate, HukdisResponse
from app.models.simpeg_models import RefHukdis
from typing import List

router = APIRouter()


@router.get("/")
async def root():
    """
    Mengambil semua data master Jenis Hukuman Disiplin
    """
    return {
        "status": "success",
        "module": "Simpeg",
        "category": "Hukuman Disiplin",
        "data": [
            {"id": 1, "nama": "xxxxx"},
            {"id": 2, "nama": "yyyyy"}
        ]
    }



@router.post("/read", response_model=List[HukdisResponse])
async def read_hukdis(db:AsyncSession = Depends(get_db)):
    query = select(RefHukdis)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model=HukdisResponse)
async def create_hukdis(payload:  HukdisCreate, db: AsyncSession = Depends(get_db)):
    query = RefHukdis(
        kode = payload.kode,
        nama = payload.nama,
        created_by = "user.id"
    )
    db.add(query)
    await db.commit()
    await db.refresh(query)
    return query

@router.post("/update/{id}", response_model=HukdisResponse)
async def update_hukdis(id: str, payload: HukdisUpdate, db: AsyncSession = Depends(get_db)):
    query = select(RefHukdis).filter(RefHukdis.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Data Tidak ditemukan")

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await db.commit()
    await db.refresh(db_data)
    return db_data

@router.post("/delete/{id}")
async def delete_hukdis(id:str, db : AsyncSession = Depends(get_db)):
    query = select(RefHukdis).filter(RefHukdis.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")
    
    await db.delete(db_data)
    await db.commit()
    return {"message": f"Ref Hukdis {db_data.nama} berhasil dihapus"}
    