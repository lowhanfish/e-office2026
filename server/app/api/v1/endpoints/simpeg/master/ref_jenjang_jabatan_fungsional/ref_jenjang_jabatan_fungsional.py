from fastapi import APIRouter, Depends, HTTPException

from app.models.simpeg.master.models import RefJenjangJabatanFungsional
from app.db.session_simpeg import get_db
from app.api.deps import get_current_user
from .schema import JenjangJabatanFungsionalCreate, JenjangJabatanFungsionalResponse, JenjangJabatanFungsionalResponseList

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List


router = APIRouter()


@router.get("/option", response_model=List[JenjangJabatanFungsionalResponse])
async def option(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(RefJenjangJabatanFungsional)

    if search:
        query = query.where(RefJenjangJabatanFungsional.nama.ilike(f"%{search}%"))

    query = query.order_by(RefJenjangJabatanFungsional.created_at.desc()).offset(skip).limit(limit)

    result = await db.execute(query)
    return result.scalars().all()



@router.get("/read", response_model=JenjangJabatanFungsionalResponseList)
async def read(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(RefJenjangJabatanFungsional)
    if search:
        query = query.where(RefJenjangJabatanFungsional.nama.ilike(f"%{search}%"))

    total_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(total_query)
    total = total_result.scalar_one_or_none()

    query = query.order_by(RefJenjangJabatanFungsional.created_at.desc()).offset(skip).limit(limit)
    result = await db.execute(query)
    data = result.scalars().all()


    return {
        "skip" : skip,
        "limit" : limit,
        "total" : total,
        "data" : data
    }


@router.post("/create", response_model=JenjangJabatanFungsionalResponse)
async def create(
    payload : JenjangJabatanFungsionalCreate,
    db:AsyncSession = Depends(get_db),
    user = Depends(get_current_user)

):
    new_data = RefJenjangJabatanFungsional(
        kode = payload.kode,
        nama = payload.nama,
        created_by= user.id
    )

    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)

    print(new_data)


    return new_data



@router.patch("/update/{id}", response_model=JenjangJabatanFungsionalResponse)
async def update(
    id: str,
    payload : JenjangJabatanFungsionalCreate,
    db:AsyncSession = Depends(get_db)
):

    query = select(RefJenjangJabatanFungsional).where(RefJenjangJabatanFungsional.id == id)
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

@router.delete("/delete/{id}")
async def delete(
    id: str,
    db:AsyncSession = Depends(get_db)
):
    query = select(RefJenjangJabatanFungsional).where(RefJenjangJabatanFungsional.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")

    nama = db_data.nama

    await db.delete(db_data)
    await db.commit()
    return {"message": f"Ref Jenjang Jabatan Fungsional ID : {nama} berhasil dihapus"}

            