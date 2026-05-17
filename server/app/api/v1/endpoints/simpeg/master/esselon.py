from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.session import get_db
from app.schemas.simpeg.master.ref_esselon import EsselonCreate, EsselonResponse, EsselonUpdate
from app.models.simpeg_models import Esselon, User # <--- Tambah import User jika dibutuhkan type-hint
from app.api.deps import get_current_user # <--- IMPORT PAGAR GHAIB DI SINI
from typing import List

router = APIRouter()

@router.get("/")
async def root():
    """
    Mengambil semua data master esselon (Terbuka untuk umum/Tes)
    """
    return {
        "status": "success",
        "module": "Simpeg",
        "category": "Master Data",
        "data": [
            {"id": 1, "nama_esselon": "I.a"},
            {"id": 2, "nama_esselon": "II.a"}
        ]
    }

@router.post("/read", response_model=List[EsselonResponse])
async def read_esselon(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user) # <--- DIKUNCI
):
    query = select(Esselon)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/create", response_model=EsselonResponse) # Ubah response_model ke EsselonResponse agar id & created_at ikut tampil
async def create_esselon(
    payload: EsselonCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user) # <--- DIKUNCI
):
    # Bapak bisa lihat di log terminal siapa yang sedang nge-create data
    print(f"User yang membuat data: {current_user.username}") 
    
    new_Data = Esselon(
        kode = payload.kode,
        nama = payload.nama,
        jabatan_asn = payload.jabatan_asn,
        created_by = current_user.username # <--- OTOMATIS mengambil username dari token yang login
    )
    db.add(new_Data)
    await db.commit()
    await db.refresh(new_Data)

    return new_Data


@router.post("/update/{id}", response_model=EsselonResponse)
async def update_esselon(
    id: str, 
    payload: EsselonUpdate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user) # <--- DIKUNCI
):
    query = select(Esselon).filter(Esselon.id == id)
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
async def delete_esselon( # Diperbaiki nama fungsinya biar tidak bentrok dengan fungsi update di atas
    id: str, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user) # <--- DIKUNCI
):
    query = select(Esselon).filter(Esselon.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")
    
    await db.delete(db_data)
    await db.commit()

    return {"message": f"Esselon {db_data.nama} berhasil dihapus oleh {current_user.username}"}