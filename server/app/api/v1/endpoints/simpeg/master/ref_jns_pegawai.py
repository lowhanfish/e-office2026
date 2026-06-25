from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.db.session import get_db
from app.models.simpeg.master.models import RefJnsPegawai
from app.schemas.simpeg.master.ref_jns_pegawai import RefJnsPegawaiCreate, RefJnsPegawaiResponse, RefJnsPegawaiUpdate, RefJnsPegawaiResponseList
from sqlalchemy.sql import func


router = APIRouter()

@router.get("/read", response_model=RefJnsPegawaiResponseList)
async def read_ref_jns_pegawai(
    db:AsyncSession = Depends(get_db),
    skip:int = 0,
    limit:int = 100,
    search:str | None = None,
):
    """
    ## Mengambil semua List Ref Jenis Pegawai
    Membaca data Ref Jenis Pegawai baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Ref Jenis Pegawai.
    - `page_start`: Int, Data page pertama akses page.
    - `page_limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    query = select(RefJnsPegawai)

    if search:
        query = query.where(RefJnsPegawai.nama.ilike(f"%{search}%"))

    total_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(total_query)
    total = total_result.scalar_one_or_none()
    query = (
        query.order_by(RefJnsPegawai.created_at.asc())
        .offset(skip)
        .limit(limit)
    )
    result = await db.execute(query)
    data = result.scalars().all()
    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "data": data,
    }

@router.post("/create", response_model=RefJnsPegawaiResponse)
async def create_ref_jns_pegawai(payload: RefJnsPegawaiCreate, db:AsyncSession = Depends(get_db)):
    """
    ## Membuat Ref Jenis Pegawai
    Menambahkan data Ref Jenis Pegawai baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Jenis Pegawai.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    new_data = RefJnsPegawai(
        kode = payload.kode,
        nama = payload.nama,
        created_by ="user.id",
    )
    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data


@router.put("/update/{id}", response_model=RefJnsPegawaiResponse)
async def update_ref_jns_pegawai(id:str, payload: RefJnsPegawaiUpdate, db:AsyncSession = Depends(get_db)):
    """
    ## Mengubah Ref Jenis Pegawai
    Mengubah data item Ref Jenis Pegawai di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Jenis Pegawai.
   
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    - `404`: Jika Id dari data yang akan diupdate tidak ditemukan.
    """
    query = select(RefJnsPegawai).where(RefJnsPegawai.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Id dari data yang anda pilih tidak ditemukan")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await db.commit()
    await db.refresh(db_data)
    return db_data

@router.delete("/delete/{id}")
async def delete_ref_jns_pegawai(id:str, db:AsyncSession = Depends(get_db)):
    """
    ## Menghapus Ref Jenis Pegawai
    Menghapus data item Ref Jenis Pegawai di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.x
    - `404`: Jika Id dari data yang akan dihapus tidak ditemukan.
    """
    query = select(RefJnsPegawai).where(RefJnsPegawai.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Id dari data yang anda pilih tidak ditemukan")
    
    nama = db_data.nama
    await db.delete(db_data)
    await db.commit()

    return {
        "message" : f"Referensi Jenis Pegawai : '{nama}', telah dihapus"
    }
