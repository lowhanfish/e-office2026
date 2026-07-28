from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.db.session import get_db
from app.models.simpeg.master.models import RefJnsLokasi
from app.schemas.simpeg.master.ref_jns_lokasi import RefJnsLokasiCreate, RefJnsLokasiResponse, RefJnsLokasiUpdate, RefJnsLokasiResponseList
from sqlalchemy.sql import func

router = APIRouter()


@router.get("/read", response_model=RefJnsLokasiResponseList)
async def read_ref_jns_lokasi(
    db:AsyncSession = Depends(get_db),
    skip:int = 0,
    limit:int = 100,
    search:str | None = None
):
    """
    ## Mengambil semua List Ref Jenis Lokasi
    Membaca data Ref Jenis Lokasi baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Ref Jenis Lokasi.
    - `page_start`: Int, Data page pertama akses page.
    - `page_limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    query = select(RefJnsLokasi)

    if search:
        query = query.where(RefJnsLokasi.nama.ilike(f"%{search}%"))

    total_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(total_query)
    total = total_result.scalar_one_or_none() or 0

    query = query.order_by(RefJnsLokasi.created_at.asc()).offset(skip).limit(limit)


    result = await db.execute(query)
    data =  result.scalars().all()
    return {
        "data" : data,
        "total" : total,
        "skip" : skip,
        "limit" : limit
    }

@router.post("/create", response_model=RefJnsLokasiResponse)
async def create_ref_jns_lokasi(payload:RefJnsLokasiCreate, db:AsyncSession = Depends(get_db)):
    """
    ## Membuat Ref Jenis Lokasi
    Menambahkan data Ref Jenis Lokasi baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Jenis Lokasi.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    new_data = RefJnsLokasi(
        kode = payload.kode,
        nama = payload.nama,
        created_by = "user.id",
    )
    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data

@router.put("/update/{id}", response_model=RefJnsLokasiResponse)
async def update_ref_jns_lokasi(id:str, payload:RefJnsLokasiUpdate, db:AsyncSession = Depends(get_db)):
    """
    ## Mengubah Ref Jenis Lokasi
    Mengubah data item Ref Jenis Lokasi di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Jenis Lokasi.
   
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    - `404`: Jika Id dari data yang akan diupdate tidak ditemukan.
    """
    query = select(RefJnsLokasi).where(RefJnsLokasi.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="Id data yang anda pilih tidak ditemukan")

    update_data = payload.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        if hasattr(data_db, key):
            setattr(data_db, key, value)

    await db.commit()
    await db.refresh(data_db)
    return data_db


@router.delete("/delete/{id}")
async def delete_ref_jns_lokasi(id:str, db:AsyncSession = Depends(get_db)):
    """
    ## Menghapus Ref Jenis Lokasi
    Menghapus data item Ref Jenis Lokasi di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.x
    - `404`: Jika Id dari data yang akan dihapus tidak ditemukan.
    """
    query = select(RefJnsLokasi).where(RefJnsLokasi.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="Id data yang anda pilih tidak ditemukan")
    
    nama = data_db.nama
    await db.delete(data_db)
    await db.commit()
    return {
        "message" : f"Referensi Status Hidup : '{nama}', telah dihapus"
    }





