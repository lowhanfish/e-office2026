from app.db.transaction import commit_or_raise_unique_conflict
from fastapi import APIRouter, Depends, HTTPException
from .schema import ResponseRumpunJabatan, CreateRumpunJabatan, UpdateRumpunJabatan, ResponseRumpunJabatanList
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.api.deps import get_current_user
from typing import List
from sqlalchemy import select, func
from app.models.simpeg.master.models import RumpunJabatan


router = APIRouter()

@router.get("/read", response_model=ResponseRumpunJabatanList)
async def read_RumpunJabatan(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db : AsyncSession = Depends(get_db)
):

    """
    ## Mengambil semua List Rumpun Jabatan
    Membaca data Rumpun Jabatan baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Rumpun Jabatan.
    - `page_start`: Int, Data page pertama akses page.
    - `page_limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """


    query = select(RumpunJabatan)
    if search:
        query = query.where(RumpunJabatan.nama.ilike(f"%{search}%"))

    query_total = select(func.count()).select_from(query.subquery())
    query_result = await db.execute(query_total)
    total = query_result.scalar_one_or_none()

    query = query.order_by(RumpunJabatan.created_at).offset(skip).limit(limit)
    result = await db.execute(query)
    data = result.scalars().all()

    return {
        "skip" : skip,
        "limit" : limit,
        "total" : total,
        "data" : data
    }

@router.post("/create", response_model=ResponseRumpunJabatan)
async def read_RumpunJabatan(payload: CreateRumpunJabatan, db: AsyncSession = Depends(get_db), current_user = Depends(get_current_user)):
    """
    ## Membuat Rumpun Jabatan
    Menambahkan data Rumpun Jabatan baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Rumpun Jabatan.
    - `kode_cepat`: **String**, Kode Cepat Rumpun Jabatan (sebaiknya di ambil dari `kode_cepat` tabel referensi BKN).
   
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    
    new_data = RumpunJabatan(
        kode = payload.kode,
        nama = payload.nama,
        kode_cepat = payload.kode_cepat,
        created_by = current_user.id
    )

    db.add(new_data)
    await commit_or_raise_unique_conflict(db)
    await db.refresh(new_data)
    return new_data


@router.patch("/update/{id}", response_model=ResponseRumpunJabatan)
async def read_RumpunJabatan(id:str, payload : UpdateRumpunJabatan, db: AsyncSession = Depends(get_db)):
    """
    ## Mengubah Rumpun Jabatan
    Mengubah data item Rumpun Jabatan di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Rumpun Jabatan.
    - `kode_cepat`: **String**, Kode Cepat Rumpun Jabatan (sebaiknya di ambil dari `kode_cepat` tabel referensi BKN).
   
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    
    query = select(RumpunJabatan).filter(RumpunJabatan.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await commit_or_raise_unique_conflict(db)
    await db.refresh(db_data)
    return db_data


@router.delete("/delete/{id}")
async def read_RumpunJabatan(id:str, db: AsyncSession = Depends(get_db)):
    """
    ## Menghapus Rumpun Jabatan
    Menghapus data item Rumpun Jabatan di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(RumpunJabatan).filter(RumpunJabatan.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")
    
    await db.delete(db_data)
    await commit_or_raise_unique_conflict(db)
    return {"message": f"Rumpun Jabatan {db_data.nama} berhasil dihapus"}
