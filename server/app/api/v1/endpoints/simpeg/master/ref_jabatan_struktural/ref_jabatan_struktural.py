from fastapi import APIRouter, Depends, HTTPException
from app.api.v1.endpoints.simpeg.master.ref_jabatan_struktural.schema import RefJabatanStrukturalCreate, RefJabatanStrukturalResponse, RefJabatanStrukturalResponseList
from app.db.session_simpeg import get_db
from app.api.deps import get_current_user
from app.models.simpeg.master.models import RefJabatanStruktural, Esselon, Unor, SubUnitKerja
from typing import List

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import aliased

router = APIRouter()
ParentUnor = aliased(Unor, name="Unor_parent")

@router.get("/option", response_model=List[RefJabatanStrukturalResponse])
async def option(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(
        *RefJabatanStruktural.__table__.c,
        Esselon.nama.label("ref_esselon_nama"),
        Unor.nama.label("ref_unor_nama"),
        ParentUnor.nama.label("ref_unor_parent_nama"),
        SubUnitKerja.nama.label("sub_unit_kerja_nama")
    )

    query = query.outerjoin(Esselon, Esselon.kode == RefJabatanStruktural.ref_esselon_id)
    query = query.outerjoin(Unor, Unor.id == RefJabatanStruktural.ref_unor_id)
    query = query.outerjoin(ParentUnor, ParentUnor.id == Unor.parent_id)
    query = query.outerjoin(SubUnitKerja, SubUnitKerja.id == Unor.sub_unit_kerja)

    if search:
        query = query.where(RefJabatanStruktural.nama.ilike(f"%{search}%"))

    query = query.order_by(RefJabatanStruktural.created_at).offset(skip).limit(limit)
    
    result = await db.execute(query)
    return result.mappings().all()



@router.get("/read", response_model=RefJabatanStrukturalResponseList)
async def option(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(
        *RefJabatanStruktural.__table__.c,
        Esselon.nama.label("ref_esselon_nama"),
        Unor.nama.label("ref_unor_nama"),
        ParentUnor.nama.label("ref_unor_parent_nama"),
        SubUnitKerja.nama.label("sub_unit_kerja_nama")
    )

    query = query.outerjoin(Esselon, Esselon.kode == RefJabatanStruktural.ref_esselon_id)
    query = query.outerjoin(Unor, Unor.id == RefJabatanStruktural.ref_unor_id)
    query = query.outerjoin(ParentUnor, ParentUnor.id == Unor.parent_id)
    query = query.outerjoin(SubUnitKerja, SubUnitKerja.id == Unor.sub_unit_kerja)

    if search:
        query = query.where(RefJabatanStruktural.nama.ilike(f"%{search}%"))

    total_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(total_query)
    total = total_result.scalar_one_or_none()

    query = query.order_by(RefJabatanStruktural.created_at).offset(skip).limit(limit)

    result = await db.execute(query)
    data = result.mappings().all()

    return {
        "skip" : skip,
        "limit" : limit,
        "total" : total,
        "data" : data,
    }




@router.post("/create")
async def create(
    payload : RefJabatanStrukturalCreate,
    db: AsyncSession = Depends(get_db),
    user = Depends(get_current_user)
):
    new_data = RefJabatanStruktural(
        **payload.model_dump(exclude={"created_by"}),
        created_by = user.id
    )

    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)

    return new_data


@router.patch("/update/{id}")
async def update(
    id:str,
    payload : RefJabatanStrukturalCreate,
    db: AsyncSession = Depends(get_db)
):
    query = select(RefJabatanStruktural).where(RefJabatanStruktural.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="di dari data yang akan diubah tidak ditemukan")

    data_update = payload.model_dump(exclude_unset=True)

    for key, value in data_update.items():
        if hasattr(data_db, key):
            setattr(data_db, key, value)

    await db.commit()
    await db.refresh(data_db)
    return data_db



@router.delete("/delete/{id}")
async def delete(
    id:str,
    db: AsyncSession = Depends(get_db)
):
    query = select(RefJabatanStruktural).where(RefJabatanStruktural.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="di dari data yang akan dihapus tidak ditemukan")

    nama = data_db.nama

    await db.delete(data_db)
    await db.commit()

    return {
        "message" : f"Referensi jabatan struktural : '{nama}' telah dihapus"
    }
