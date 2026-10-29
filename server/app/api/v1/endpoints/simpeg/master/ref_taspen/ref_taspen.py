from fastapi import APIRouter, Depends, HTTPException


from app.models.simpeg.master.models import RefTaspenId
from .schema import RefTaspenResponse, RefTaspenCreate, MasterResponseList
from app.db.session_simpeg import get_db
from app.api.deps import get_current_user

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter()

@router.get("/option")
async def option(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db : AsyncSession = Depends(get_db)
):
    query = select(RefTaspenId)
    if search:
        query = query.where(RefTaspenId.nama.ilike(f"%{search}%"))

    query = query.order_by(RefTaspenId.created_at).offset(skip).limit(limit)

    result = await db.execute(query)
    return result.scalars().all()



@router.get("/read")
async def read(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db : AsyncSession = Depends(get_db)
):
    query = select(RefTaspenId)
    if search:
        query = query.where(RefTaspenId.nama.ilike(f"%{search}%"))

    total_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(total_query)
    total = total_result.scalar_one_or_none()

    query = query.order_by(RefTaspenId.created_at).offset(skip).limit(limit)


    result = await db.execute(query)
    data = result.scalars().all()

    return {
        "skip" : skip,
        "limit" : limit,
        "total" : total,
        "data" : data,
    }
    

@router.post("/create")
async def create(
    payload : RefTaspenCreate,
    db : AsyncSession = Depends(get_db),
    user = Depends(get_current_user)
):
    new_data = RefTaspenId(
        **payload.model_dump(exclude={"created_by"}),
        created_by = user.id
    )

    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data


@router.patch("/update/{id}")
async def update(
    id: str,
    payload : RefTaspenCreate,
    db : AsyncSession = Depends(get_db)
):
    query = select(RefTaspenId).where(RefTaspenId.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="Id dari data yang akan anda update tidak ditemukan..!")

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
    db : AsyncSession = Depends(get_db)
):
    query = select(RefTaspenId).where(RefTaspenId.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="Id dari data yang akan anda hapus tidak ditemukan..!")

    nama = data_db.nama

    await db.delete(data_db)
    await db.commit()

    return  {
        "message" : f"Data Ref Taspen : '{nama}' berhasil dihapus"
    }
