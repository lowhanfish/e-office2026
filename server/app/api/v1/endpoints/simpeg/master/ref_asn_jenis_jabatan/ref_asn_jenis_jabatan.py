from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func
from sqlalchemy import select

from typing import List

from app.db.session_simpeg import get_db
from app.models.simpeg.master.models import RefAsnJenisJabatan, User
from .schema import RefAsnJenisJabatanCreate, RefAsnJenisJabatanResponse, RefAsnJenisJabatanResponseList
from app.api.deps import get_current_user
from app.db.transaction import commit_or_raise_unique_conflict

router = APIRouter()

@router.post("/create", response_model=RefAsnJenisJabatanResponse)
async def create(
    payload : RefAsnJenisJabatanCreate,
    db: AsyncSession = Depends(get_db),
    user : User = Depends(get_current_user)
):
    query = RefAsnJenisJabatan(
        **payload.model_dump(),
        created_by = user.id
    )

    db.add(query)
    await commit_or_raise_unique_conflict(db)
    await db.refresh(query)
    return query

@router.get("/option", response_model=List[RefAsnJenisJabatanResponse])
async def option(
    search : str | None = None,
    db: AsyncSession = Depends(get_db),
):
    query = select(RefAsnJenisJabatan)

    if search:
        query = query.where(RefAsnJenisJabatan.nama.ilike(f"%{search}%"))

    result = await db.execute(query)
    return result.scalars().all()



@router.get("/read", response_model=RefAsnJenisJabatanResponseList)
async def read(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db: AsyncSession = Depends(get_db),
):

    query = select(RefAsnJenisJabatan)
    if search:
        query = query.where(RefAsnJenisJabatan.nama.ilike(f"%{search}%"))

    query = query.order_by(RefAsnJenisJabatan.created_at).offset(skip).limit(limit)

    query_total = select(func.count()).select_from(query.subquery())
    result_total = await db.execute(query_total)
    total = result_total.scalar_one_or_none()

    result = await db.execute(query)
    data = result.scalars().all()

    return {
        "skip" : skip,
        "limit" : limit,
        "total" : total,
        "data" : data,
    }



@router.patch("/update/{id}", response_model=RefAsnJenisJabatanResponse)
async def update(
    id:str,
    payload : RefAsnJenisJabatanCreate,
    db: AsyncSession = Depends(get_db),
):
        query = select(RefAsnJenisJabatan).where(RefAsnJenisJabatan.id == id)
        result = await db.execute(query)
        data_db = result.scalar_one_or_none()

        if not data_db:
             raise HTTPException(status_code=404, detail="Id dari data yang anda tuju tidak ditemukan..!")

        update_data = payload.model_dump(exclude_unset=True)
        
        for key, value in update_data.items():
             if hasattr(data_db, key):
                  setattr(data_db, key, value)

        await commit_or_raise_unique_conflict(db)
        await db.refresh(data_db)
        return data_db



@router.delete("/delete/{id}")
async def delete(
    id:str,
    db: AsyncSession = Depends(get_db),
):

    query = select(RefAsnJenisJabatan).where(RefAsnJenisJabatan.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()
    
    if not data_db:
        raise HTTPException(status_code=404, detail="Id dari data yang anda tuju tidak ditemukan..!")

    nama = data_db.nama

    await db.delete(data_db)
    await db.commit()

    return {
        "message" : f"Anda berhasil menghapus data referensi level kompetensi ASN dengan nama {nama}",
        "status" : 200
    }
