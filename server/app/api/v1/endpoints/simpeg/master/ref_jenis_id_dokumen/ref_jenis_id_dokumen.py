from fastapi import APIRouter, Depends, HTTPException
from app.models.simpeg.master.models import JenisIdDokumen, User
from .schema import RefJenisIdDokumenCreate, RefJenisIdDokumenResponse, RefJenisIdDokumenResponseList
from app.api.deps import get_current_user
from app.db.session_simpeg import get_db
from typing import List

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, select



router = APIRouter()


@router.get("/option", response_model=List[RefJenisIdDokumenResponse])
async def option(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(JenisIdDokumen)

    if search:
        query = query.where(JenisIdDokumen.nama.ilike(f"%{search}%"))

    query = query.order_by(JenisIdDokumen.created_at).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()



@router.get("/read", response_model=RefJenisIdDokumenResponseList)
async def read(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(JenisIdDokumen)

    if search:
        query = query.where(JenisIdDokumen.nama.ilike(f"%{search}%"))

    total_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(total_query)
    total = total_result.scalar_one_or_none()

    query = query.order_by(JenisIdDokumen.created_at).offset(skip).limit(limit)

    result = await db.execute(query)
    data = result.scalars().all()

    return {
        "skip" : skip,
        "limit" : limit,
        "total" : total,
        "data" : data,
    }







@router.post("/create", response_model=RefJenisIdDokumenResponse)
async def create(
    payload : RefJenisIdDokumenCreate,
    db: AsyncSession = Depends(get_db),
    user = Depends(get_current_user)
):
    new_data = JenisIdDokumen(
        **payload.model_dump(exclude={"created_by"}),
        created_by = user.id
    )

    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data

@router.patch("/update/{id}", response_model=RefJenisIdDokumenResponse)
async def update(
    id: str,
    payload : RefJenisIdDokumenCreate,
    db: AsyncSession = Depends(get_db)
):
    query = select(JenisIdDokumen).where(JenisIdDokumen.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="di dari data yang akan diubah tidak ditemukan")

    data_update = payload.model_dump(exclude_unset=True)

    for key, value in data_update.items():
        if hasattr(data_db, key):
            setattr(data_db, key, value)

    await db.commit()
    await db.refresh(data_db)
    return data_db


@router.delete("/delete/{id}")
async def delete(
    id: str,
    db: AsyncSession = Depends(get_db)
):
    query = select(JenisIdDokumen).where(JenisIdDokumen.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="di dari data yang akan diubah tidak ditemukan")

    nama = data_db.nama
    await db.delete(data_db)
    await db.commit()

    return {
        "message" : f"Referensi Jenis Id Dokumen : '{nama}' telah dihapus"
    }


