from fastapi import APIRouter, Depends, HTTPException
from app.models.simpeg.master.models import Unor, SubUnitKerja
from .schema import RefUnorCreate, RefUnorResponse, RefUnorResponseList

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import aliased

from app.db.session_simpeg import get_db
from app.api.deps import get_current_user
from app.db.transaction import commit_or_raise_unique_conflict

from typing import List

router = APIRouter()

ParentUnor = aliased(Unor)

@router.get("/option", response_model=List[RefUnorResponse])
async def option(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db : AsyncSession = Depends(get_db)
):
    query = select(
        *Unor.__table__.c,
        SubUnitKerja.nama.label("sub_unit_kerja_nama"),
        ParentUnor.nama.label("parent_id_nama")
    )

    query = query.outerjoin(SubUnitKerja, SubUnitKerja.id == Unor.sub_unit_kerja)
    query = query.outerjoin(ParentUnor, ParentUnor.id == Unor.parent_id)

    if search:
        query = query.where(Unor.nama.ilike(f"%{search}%"))

    query = query.order_by(Unor.created_at.desc()).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.mappings().all()


@router.get("/read", response_model=RefUnorResponseList)
async def read(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db : AsyncSession = Depends(get_db)
):
    query = select(
        *Unor.__table__.c,
        SubUnitKerja.nama.label("sub_unit_kerja_nama"),
        ParentUnor.nama.label("parent_id_nama")
    )

    query = query.outerjoin(SubUnitKerja, SubUnitKerja.id == Unor.sub_unit_kerja)
    query = query.outerjoin(ParentUnor, Unor.parent_id == ParentUnor.id)

    if search:
        query = query.where(Unor.nama.ilike(f"%{search}%"))

    total_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(total_query)
    total = total_result.scalar_one_or_none()

    query = query.order_by(Unor.created_at.desc()).offset(skip).limit(limit)
    result = await db.execute(query)
    data = result.mappings().all()

    return {
        "skip" : skip,
        "limit" : limit,
        "total" : total,
        "data" : data
    }






@router.post("/create", response_model=RefUnorResponse)
async def create(
    payload : RefUnorCreate,
    db : AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    new_data = Unor(
        nama = payload.nama, 
        parent_id = payload.parent_id, 
        sub_unit_kerja = payload.sub_unit_kerja, 
        created_by = current_user.id
    )

    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data

@router.patch("/update/{id}", response_model=RefUnorResponse)
async def update(
    id : str,
    payload : RefUnorCreate,
    db : AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    query = select(Unor).where(Unor.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code= 404, detail="data not found")

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(data_db, key):
            setattr(data_db, key, value)

    await db.commit()
    await db.refresh(data_db)
    return data_db


@router.delete("/delete/{id}")
async def delete(
    id: str,
    db : AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    query = select(Unor).where(Unor.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code= 404, detail="data not found")

    nama = data_db.nama
    await db.delete(data_db)
    await db.commit()

    return {"message": f"Ref Unor : {nama}, berhasil dihapus"}
