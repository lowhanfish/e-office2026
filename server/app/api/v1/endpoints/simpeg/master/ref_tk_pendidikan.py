from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas.simpeg.master.ref_tk_pendidikan import RefTKPendidikanCreate, RefTKPendidikanResponse, RefTKPendidikanUpdate
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from sqlalchemy.future import select
from app.models.simpeg_models import RefTKPendidikan

router = APIRouter()



@router.post("/read", response_model=List[RefTKPendidikanResponse])
async def read_ref_tk_pendidikan(db:AsyncSession = Depends(get_db)):
    query = select(RefTKPendidikan)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model=RefTKPendidikanResponse)
async def create_ref_tk_pendidikan(payload: RefTKPendidikanCreate, db:AsyncSession = Depends(get_db)):
    new_data = RefTKPendidikan(
        kode = payload.kode,
        nama = payload.nama,
        group_tk_pend_nm = payload.group_tk_pend_nm,
        keterangan = payload.keterangan,
        created_by = "user.id",
    )
    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data

@router.post("/update/{id}", response_model=RefTKPendidikanResponse)
async def update_ref_tk_pendidikan(id:str, payload:RefTKPendidikanUpdate, db:AsyncSession = Depends(get_db)):
    query = select(RefTKPendidikan).where(RefTKPendidikan.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="id dari data yang anda pilih tidak ditemukan")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await db.commit()
    await db.refresh(db_data)
    return db_data


@router.post("/delete/{id}")
async def delete_ref_tk_pendidikan(id:str, db:AsyncSession = Depends(get_db)):
    query = select(RefTKPendidikan).where(RefTKPendidikan.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="id dari data yang anda pilih tidak ditemukan")
    
    nama = db_data.nama
    await db.delete(db_data)
    await db.commit()

    return {"message": f"Ref Riwayat : {nama}, berhasil dihapus"}
 
    