from fastapi import APIRouter, Depends, HTTPException

from app.schemas.simpeg.master.ref_jenjang_jabatan import RefJenjangCreate, RefJenjangResponse, RefJenjangResponseList
from app.models.simpeg.master.models import RefJenjangJabatan

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import func
from sqlalchemy.future import select

from app.db.session_simpeg import get_db

from app.api.deps import get_current_user
from app.models.simpeg.master.models import User
from app.db.transaction import commit_or_raise_unique_conflict

router = APIRouter()


@router.get("/")
async def test():
    return {
        "status" : 200,
        "Message" : "Router Active"
    }

@router.get("/read", response_model=RefJenjangResponseList)
async def read_ref_jenjang_jabatan(
    db:AsyncSession = Depends(get_db),
    search : str | None = None,
    skip : int = 0,
    limit : int = 100
):
    query = select(RefJenjangJabatan)
    if search:
        query = query.where(RefJenjangJabatan.nama.ilike(f"%{search}%"))

    total_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(total_query)
    total = total_result.scalar_one_or_none()

    query = query.order_by(RefJenjangJabatan.nama).offset(skip).limit(limit)

    result = await db.execute(query)
    data = result.scalars().all()

    return {
        "skip" : skip,
        "limit" : limit,
        "total" : total,
        "data" : data,
    }

@router.post("/create", response_model=RefJenjangResponse)
async def create_ref_jenjang_jabatan(
    payload:RefJenjangCreate, 
    db: AsyncSession = Depends(get_db),
    user:User = Depends(get_current_user)
):

    query = RefJenjangJabatan(
        **payload.model_dump(),
        created_by = user.id
    )

    db.add(query)
    # await db.commit()
    await commit_or_raise_unique_conflict(db)
    await db.refresh(query)

    return query

    

@router.patch("/update", response_model=RefJenjangResponse)
async def update_ref_jenjang_jabatan():
    pass

@router.delete("delete")
async def delete_ref_jenjang_jabatan():
    pass