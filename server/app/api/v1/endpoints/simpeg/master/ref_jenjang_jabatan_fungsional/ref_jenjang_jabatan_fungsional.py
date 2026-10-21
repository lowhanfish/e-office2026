from fastapi import APIRouter, Depends, HTTPException

from app.models.simpeg.master.models import RefJenjangJabatanFungsional
from app.db.session_simpeg import get_db
from app.api.deps import get_current_user
from .schema import JenjangJabatanFungsionalCreate, JenjangJabatanFungsionalResponse, JenjangJabatanFungsionalResponseList

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func


router = APIRouter()


@router.get("/option")
async def option():
    return {
        "status" : 200,
        "message" : "active"
    }


@router.get("/read", response_model=JenjangJabatanFungsionalResponseList)
async def read(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(RefJenjangJabatanFungsional)
    if search:
        query = query.where(RefJenjangJabatanFungsional.nama.ilike("f%{search}%"))

    total_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(total_query)
    total = total_result.scalar_one_or_none()

    query = query.order_by(RefJenjangJabatanFungsional.create_at.desc()).offset(skip).limit(limit)
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
    new_data = JenjangJabatanFungsionalResponse(
        kode = payload.kode,
        nama = payload.nama,
        created_by= user.id
    )

    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data



@router.patch("/update/{id}", response_model=JenjangJabatanFungsionalResponse)
async def update(
    id: str,
    payload : JenjangJabatanFungsionalCreate,
    db:AsyncSession = Depends(get_db)
):
    pass


@router.delete("/delete/{id}", response_model=JenjangJabatanFungsionalResponse)
async def delete(
    id: str,
    db:AsyncSession = Depends(get_db)
):
    pass