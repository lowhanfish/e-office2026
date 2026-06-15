from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.db.session import get_db
from app.models.simpeg.auth.models import AuthGroup
from app.schemas.simpeg.auth.auth_group import AuthGroupCreate, AuthGroupUpdate, AuthGroupRespose



router = APIRouter()


@router.get("/read", response_model=List[AuthGroupRespose])
async def auth_group_read(db: AsyncSession = Depends(get_db)):
    query = select(AuthGroup)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model=AuthGroupRespose)
async def auth_group_create(payload: AuthGroupCreate, db: AsyncSession = Depends(get_db)):
    new_data = AuthGroup(
        nama = payload.nama,
        keterangan = payload.keterangan,
        created_by = "user.id",
    )
    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data


@router.put("/update/{id}", response_model=AuthGroupRespose)
async def auth_group_update(id:str, payload: AuthGroupUpdate,db: AsyncSession = Depends(get_db)):
    query = select(AuthGroup).where(AuthGroup.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="id dari data yang anda pilih tidak ditemukan")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(data_db, key):
            setattr(data_db, key, value)

    await db.commit()
    await db.refresh(data_db)
    return data_db



@router.delete("/delete/{id}", response_model=AuthGroupRespose)
async def auth_group_delete(id:str, db: AsyncSession = Depends(get_db)):
    query = select(AuthGroup).where(AuthGroup.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="id dari data yang anda pilih tidak ditemukan")
    
    nama = data_db.nama
    
    await db.delete(data_db)
    await db.commit()
    
    return {"message" : f"Data Auth Group : {nama} berhasil dihapus"}
