from fastapi import APIRouter, Depends, HTTPException
from app.models.simpeg.master.models import UnitKerja
from app.api.deps import get_current_user
from app.db.transaction import commit_or_raise_unique_conflict
from app.db.session_simpeg import get_db
from .schema import UnitKerjaResponse, UnitKerjaCreate, UnitKerjaResponseList
from typing import List



from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

router = APIRouter()

@router.get("/option", response_model=List[UnitKerjaResponse])
async def option(
    db:AsyncSession = Depends(get_db)
):
    query = select(UnitKerja)
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/read", response_model=UnitKerjaResponseList)
async def read(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db:AsyncSession = Depends(get_db)
):
    query = select(UnitKerja)
    if search:
        query = query.where(UnitKerja.nama.ilike(f"%{search}%"))

    total_query =  select(func.count()).select_from(query.subquery())
    total_result = await db.execute(total_query)
    total = total_result.scalar_one_or_none()

    query = query.order_by(UnitKerja.created_at.desc()).offset(skip).limit(limit)

    result = await db.execute(query)
    data = result.scalars().all()

    return {
        "skip" : skip,
        "limit" : limit,
        "total" : total,
        "data" : data,
    }


@router.post("/create", response_model= UnitKerjaResponse)
async def create(
    payload : UnitKerjaCreate,
    db:AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):

    newdata = UnitKerja(
        nama = payload.nama,
        unit_induk = payload.unit_induk,
        penyedia_pbj = payload.penyedia_pbj,
        created_by = current_user.id,
    )

    db.add(newdata)
    await commit_or_raise_unique_conflict(db)
    await db.refresh(newdata)
    return newdata


@router.patch("/update/{id}", response_model= UnitKerjaResponse)
async def update(
    id : str,
    payload : UnitKerjaCreate,
    db:AsyncSession = Depends(get_db)
):

    query = select(UnitKerja).where(UnitKerja.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="Id dari data yang anda pilih tidak ditemukan")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(data_db, key):
            setattr(data_db, key, value)

    await commit_or_raise_unique_conflict(db)
    await db.refresh(data_db)
    return data_db

@router.delete("/delete/{id}")
async def delete(
    id : str,
    db:AsyncSession = Depends(get_db)
):
    query = select(UnitKerja).where(UnitKerja.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code= 404, detail="data not found")

    nama = data_db.nama
    await db.delete(data_db)
    await commit_or_raise_unique_conflict(db)

    return {"message": f"Ref Unit Kerja : {nama}, berhasil dihapus"}