from fastapi import APIRouter, Depends, HTTPException
from app.models.simpeg.master.models import RefLevelKompetensiAsn, User
from app.api.deps import get_current_user
from app.schemas.simpeg.master.ref_level_kompetensi_asn import RefLevelKompetensiAsnCreate, RefLevelKompetensiAsnResponse, RefLevelKompetensiAsnResponseList
from app.db.transaction import commit_or_raise_unique_conflict
from app.db.session import get_db

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func

from typing import List

router = APIRouter()

@router.get("/")
async def test():
    return {
        "status" : 200,
        "message" : "endpoint active"
    }

@router.get("/option", response_model=List[RefLevelKompetensiAsnResponse])
async def option(
    search:str,
    db : AsyncSession = Depends(get_db)
):
    query = select(RefLevelKompetensiAsn)
    if search:
        query = query.where(RefLevelKompetensiAsn.nama.ilike(f"%{search}%"))

    result = await db.execute(query)
    return result.scalars().all()


@router.post("/create", response_model=RefLevelKompetensiAsnResponse)
async def create(
    payload : RefLevelKompetensiAsnCreate,
    db : AsyncSession = Depends(get_db),
    user : User = Depends(get_current_user)
):
    query = RefLevelKompetensiAsn(
        **payload.model_dump(),
        created_by = user.id
    )

    db.add(query)
    await commit_or_raise_unique_conflict(db)
    await db.refresh(query)
    return query


@router.get("/read")
async def read(
    skip : int = 0,
    limit: int = 100,
    search : str | None = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(RefLevelKompetensiAsn)
    if search:
        query = query.where(RefLevelKompetensiAsn.nama.ilike(f"%{search}%"))
    query = query.order_by(RefLevelKompetensiAsn.created_at).offset(skip).limit(limit)

    total_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(total_query)
    total = total_result.scalar_one_or_none()

    result = await db.execute(query)
    data = result.scalars().all()

    return {
        "skip" : skip,
        "limit" : limit,
        "total" : total,
        "data" : data 
    }


@router.patch("/update/{id}", response_model=RefLevelKompetensiAsnResponse)
async def update(
    id:str,
    payload : RefLevelKompetensiAsnCreate,
    db: AsyncSession = Depends(get_db)
):
    query = select(RefLevelKompetensiAsn).where(RefLevelKompetensiAsn.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="Id dari data yang anda tuju tidak ditemukan..!")

    data_update = payload.model_dump(exclude_unset=True)

    for key, value in data_update.items():
        if hasattr(data_db, key):
            setattr(data_db, key, value)

    await commit_or_raise_unique_conflict(db)
    await db.refresh(data_db)
    return data_db


@router.delete("/delete/{id}")
async def delete(
    id:str,
    db: AsyncSession = Depends(get_db)
):
    query = select(RefLevelKompetensiAsn).where(RefLevelKompetensiAsn.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="data dengan id yang anda tuju tidak ditemukan..!")

    nama = data_db.nama

    await db.delete(data_db)
    await db.commit()

    return {
        "message" : f"Anda berhasil menghapus data referensi level kompetensi ASN dengan nama {nama}",
        "status" : 200
    }
