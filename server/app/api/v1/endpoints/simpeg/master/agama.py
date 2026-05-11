from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.session import get_db
from app.schemas.simpeg.master.agama import AgamaCreate, AgamaResponse, AgamaUpdate
from app.services.simpeg.master_service import crud_agama

router = APIRouter()

# Tampil Semua Data
@router.get("/", response_model=List[AgamaResponse])
async def read_agama(db: AsyncSession = Depends(get_db), skip: int = 0, limit: int = 100):
    return await crud_agama.get_multi(db, skip=skip, limit=limit)

# Tambah Data
@router.post("/create", response_model=AgamaResponse)
async def create_agama(payload: AgamaCreate, db: AsyncSession = Depends(get_db)):
    # .model_dump() mengubah schema Pydantic jadi Dictionary Python
    return await crud_agama.create(db, obj_in=payload.model_dump())

# Edit Data (Metode POST)
@router.post("/update/{id}", response_model=AgamaResponse)
async def update_agama(id: str, payload: AgamaUpdate, db: AsyncSession = Depends(get_db)):
    # exclude_unset=True agar kolom yang tidak diisi di Next.js tidak merusak data lama
    updated = await crud_agama.update(db, id=id, obj_in=payload.model_dump(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")
    return updated

# Hapus Data (Metode POST)
@router.post("/delete/{id}")
async def delete_agama(id: str, db: AsyncSession = Depends(get_db)):
    success = await crud_agama.remove(db, id=id)
    if not success:
        raise HTTPException(status_code=404, detail="Gagal menghapus data")
    return {"message": "Berhasil menghapus data"}