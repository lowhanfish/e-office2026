from fastapi import APIRouter, Depends, HTTPException

from .schema import RefJenjangCreate, RefJenjangResponse, RefJenjangResponseList
from app.models.simpeg.master.models import RefJenjangJabatan, RefLevelKompetensiAsn, RefAsnJenisJabatan

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import func
from sqlalchemy.future import select

from app.db.session_simpeg import get_db

from app.api.deps import get_current_user
from app.models.simpeg.master.models import User
from app.db.transaction import commit_or_raise_unique_conflict

router = APIRouter()


@router.get("/option", response_model=list[RefJenjangResponse])
async def test(
    search: str|None = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(RefJenjangJabatan)
    if search:
        query = query.where(RefJenjangJabatan.nama.ilike(f"%{search}%"))
    result = await db.execute(query)
    return result.scalars().all()
   

@router.get("/read", response_model=RefJenjangResponseList)
async def read_ref_jenjang_jabatan(
    db:AsyncSession = Depends(get_db),
    search : str | None = None,
    skip : int = 0,
    limit : int = 100
):
    query = select(
        *RefJenjangJabatan.__table__.c,
        RefLevelKompetensiAsn.nama.label("level_kompetensi_jabatan_uraian"),
        RefAsnJenisJabatan.nama.label("asn_jenis_jabatan_id_uraian"),
    )
    query = query.join(RefLevelKompetensiAsn, RefLevelKompetensiAsn.kode == RefJenjangJabatan.level_kompetensi_jabatan)
    query = query.join(RefAsnJenisJabatan, RefAsnJenisJabatan.kode == RefJenjangJabatan.asn_jenis_jabatan_id)
    
    if search:
        query = query.where(RefJenjangJabatan.nama.ilike(f"%{search}%"))

    total_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(total_query)
    total = total_result.scalar_one_or_none()

    query = query.order_by(RefJenjangJabatan.created_at).offset(skip).limit(limit)

    result = await db.execute(query)
    # data = result.scalars().all()
    data = result.mappings().all()

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

    
@router.patch("/update/{id}", response_model=RefJenjangResponse)
async def update_ref_jenjang_jabatan(
    id:str,
    payload : RefJenjangCreate,
    db:AsyncSession = Depends(get_db)
):

    query = select(RefJenjangJabatan).where(RefJenjangJabatan.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="Id dari data yang anda tuju tidak ditemukan..!")

    update_data = payload.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        if hasattr(data_db, key):
            setattr(data_db, key, value)

    await commit_or_raise_unique_conflict(db)
    await db.refresh(data_db)

    return data_db


@router.delete("/delete/{id}")
async def delete_ref_jenjang_jabatan(
    id:str,
    db : AsyncSession = Depends(get_db)
):
    query = select(RefJenjangJabatan).where(RefJenjangJabatan.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="id dari data yang anda tuju tidak ditemukan")

    last_data = data_db
    await db.delete(data_db)
    await commit_or_raise_unique_conflict(db)

    return {
        "message" : f"Data Ref Jenjang Jabatan : {last_data.nama} telah dihapus",
        "status" : 200
    }
    
