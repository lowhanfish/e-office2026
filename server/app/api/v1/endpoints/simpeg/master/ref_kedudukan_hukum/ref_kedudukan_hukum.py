from fastapi import APIRouter, Depends, HTTPException
from app.db.session_simpeg import get_db
from app.models.simpeg.master.models import RefKedudukanHukum, User
from .schema import RefKedudukanHukumCreate, RefKedudukanHukumResponse, RefKedudukanHukumResponseList
from app.api.deps import get_current_user
from typing import List

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter()

@router.get("/option", response_model=List[RefKedudukanHukumResponse])
async def option(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(RefKedudukanHukum)
    if search:
        query = query.where(RefKedudukanHukum.nama.ilike(f"%{search}%"))

    query = query.order_by(RefKedudukanHukum.created_at).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()



@router.get("/read", response_model=RefKedudukanHukumResponseList)
async def read(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(RefKedudukanHukum)
    if search:
        query = query.where(RefKedudukanHukum.nama.ilike(f"%{search}%"))

    total_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(total_query)
    total = total_result.scalar_one_or_none()

    query = query.order_by(RefKedudukanHukum.created_at).offset(skip).limit(limit)
    result = await db.execute(query)
    data = result.scalars().all()

    return {
        "skip" : skip,
        "limit" : limit,
        "total" : total,
        "data" : data,
    }



@router.post("/create", response_model=RefKedudukanHukumResponse)
async def create(
    payload : RefKedudukanHukumCreate,
    db: AsyncSession = Depends(get_db),
    user = Depends(get_current_user)
):
    new_data = RefKedudukanHukum(
        **payload.model_dump(exclude={"created_at"}),
        created_by = user.id
    )

    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data


@router.patch("/update/{str}", response_model=RefKedudukanHukumResponse)
async def update(
    id:str,
    payload : RefKedudukanHukumCreate,
    db: AsyncSession = Depends(get_db)
):
    query = select(RefKedudukanHukum).where(RefKedudukanHukum.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="Id data yang akan anda update tidak ditemukan..!")

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(data_db, key):
            setattr(data_db, key, value)

    await db.commit()
    await db.refresh(data_db)
    return data_db

    
@router.delete("/delete/{str}")
async def delete(
    id:str,
    db: AsyncSession = Depends(get_db)
):
    query = select(RefKedudukanHukum).where(RefKedudukanHukum.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="Id data yang akan anda update tidak ditemukan..!")

    nama = data_db.nama

    await db.delete(data_db)
    await db.commit()

    return {
        "message" : f"Referensi Kedudukan Hukum '{nama}' telah dihapus"
    }
