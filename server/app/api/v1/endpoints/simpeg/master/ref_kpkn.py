from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.simpeg.master.ref_kpkn import RefCreateKpkn, RefResponseKpkn, RefResponseListKpkn, RefUpdateKpkn
from app.models.simpeg.master.models import User, RefKPKN
from app.db.session_simpeg import get_db
from app.api.deps import get_current_user
from sqlalchemy.future import select
from sqlalchemy.sql import func


router = APIRouter()


@router.get('/')
async def test():
    return {
        "status" : 200,
        "message" : "ok"
    }


@router.post('/create', response_model=RefResponseKpkn)
async def create_ref_kpkn(
    payload : RefCreateKpkn,
    db : AsyncSession = Depends(get_db),
    user : User = Depends(get_current_user)
):

    query = RefKPKN(
        kode = payload.kode,
        nama = payload.nama,
        created_by = user.id
    )

    db.add(query)
    await db.commit()
    await db.refresh(query)
    
    return query


@router.get('read/', response_model=RefResponseListKpkn)
async def read_ref_kpkn(
    limit : int = 100,
    skip : int = 0,
    search : str | None = None,
    db : AsyncSession = Depends(get_db)
):

    query = select(RefKPKN)

    if search:
        query = query.where(RefKPKN.nama.ilike(f"{search}"))

    total_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(total_query)
    total = total_result.scalar_one_or_none() or 0


    query = (
        query.order_by(RefKPKN.created_at.asc()).offset(skip).limit(limit)
    )

    result = await db.execute(query)

    data = result.mappings().all()
    
    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "data": data,
    }

@router.get('readOne/{id}')
async def read_one_ref_kpkn(id:str):
    return {
        "status" : 200,
        "message" : "ok"
    }


@router.patch('/update/{id}')
async def update_ref_kpkn(id:str):
    return {
        "status" : 200,
        "message" : "ok"
    }

@router.delete('/delete/{id}')
async def delete_ref_kpkn(id:str):
    return {
        "status" : 200,
        "message" : "ok"
    }