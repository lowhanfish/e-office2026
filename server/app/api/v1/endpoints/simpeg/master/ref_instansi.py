from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
# Menggunakan import modern, hilangkan sqlalchemy.future
from sqlalchemy import select, insert, update, delete, func 
from app.models.simpeg.master.models import Instansi, JenisInstansi, JenisInstansiId
from app.schemas.simpeg.master.ref_instansi import InstansiCreate, InstansiResponse, InstansiUpdate, InstansiResponseList

router = APIRouter()

@router.get("/options", response_model=List[InstansiResponse])
async def read_options(db : AsyncSession = Depends(get_db)):
    query = select(
        *Instansi.__table__.c,
        JenisInstansi.nama.label("jenis_nama"),
        JenisInstansiId.nama.label("jenis_instansi_nama"),
    )

    query = query.join(JenisInstansi, Instansi.jenis == JenisInstansi.kode)
    query = query.join(JenisInstansiId, Instansi.jenis_instansi_id == JenisInstansiId.kode)
    result = await db.execute(query)


    return result.mappings().all()


@router.get("/read", response_model=InstansiResponseList)
async def read_Instansi(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    search: str | None = None
):
    """
    ## Mengambil semua List Instansi
    Membaca data Instansi baru dari sistem.
    """
    # 1. Query Utama (Spesifik kolom & Join)
    query = select(
        *Instansi.__table__.c,
        JenisInstansi.nama.label("jenis_nama"),
        JenisInstansiId.nama.label("jenis_instansi_nama"),
    )
    
    query = query.join(JenisInstansi, Instansi.jenis == JenisInstansi.kode)
    query = query.join(JenisInstansiId, Instansi.jenis_instansi_id == JenisInstansiId.kode)

    if search:
        query = query.where(Instansi.nama.ilike(f"%{search}%"))

    # 2. Hitung Total Data (Count)
    total_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(total_query)
    total = total_result.scalar_one_or_none() or 0

    # 3. Eksekusi dengan Pagination (Skip & Limit)
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)

    # 4. Hasil Flat
    data = result.mappings().all()

    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "data": data,
    }


@router.post("/create")
async def create_Instansi(payload: InstansiCreate, db: AsyncSession = Depends(get_db)):
    """
    ## Membuat Ref Instansi
    Menambahkan data Instansi baru ke dalam sistem dengan 1x query.
    """
    query = (
        insert(Instansi)
        .values(
            kode=payload.kode,
            kode_cepat=payload.kode_cepat,
            nama=payload.nama,
            jenis=payload.jenis,
            jenis_instansi_id=payload.jenis_instansi_id,
            created_by=payload.created_by,
        )
        .returning(*Instansi.__table__.c)
    )

    result = await db.execute(query)
    await db.commit()
    
    # Langsung return data baru tanpa perlu SELECT ulang (db.refresh)
    return result.mappings().first()


@router.put("/update/{id}")
async def update_Instansi(id: str, payload: InstansiUpdate, db: AsyncSession = Depends(get_db)):
    """
    ## Mengubah Instansi
    Mengubah data item Instansi menggunakan pola Core yang hemat query.
    """
    # Ambil hanya field yang benar-benar dikirim oleh user
    update_data = payload.model_dump(exclude_unset=True)

    query = (
        update(Instansi)
        .where(Instansi.id == id)
        .values(
            # update semua column
            **update_data
            # # Langsung tembak ke properti payload, tidak perlu di-unpack
            # nama=payload.nama,
            # kode_cepat=payload.kode_cepat
        )
        .returning(*Instansi.__table__.c)
    )

    result = await db.execute(query)
    await db.commit()
    
    db_data = result.mappings().first()
    
    # Jika db_data kosong, berarti ID tidak ditemukan di database
    if not db_data:
        raise HTTPException(status_code=404, detail="id data yang anda pilih tidak ditemukan")

    return db_data


@router.delete("/delete/{id}")
async def delete_Instansi(id: str, db: AsyncSession = Depends(get_db)):
    """
    ## Menghapus Instansi
    Menghapus data langsung berdasarkan ID.
    """
    query = (
        delete(Instansi)
        .where(Instansi.id == id)
        .returning(Instansi.nama) # Cukup ambil namanya saja untuk pesan response
    )

    result = await db.execute(query)
    await db.commit()
    
    deleted_nama = result.scalar_one_or_none()
    
    if not deleted_nama:
        raise HTTPException(status_code=404, detail="id data yang anda pilih tidak ditemukan")

    return {
        "message": f"Referensi Instansi '{deleted_nama}' telah dihapus"
    }