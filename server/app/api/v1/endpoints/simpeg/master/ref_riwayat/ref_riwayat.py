from app.db.transaction import commit_or_raise_unique_conflict
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.db.session import get_db
from app.api.deps import get_current_user
from app.models.simpeg.master.models import RefRiwayat
from .schema import RiwayatResponse, RiwayatCreate, RiwayatUpdate, RiwayatResponseList
from typing import List


router = APIRouter()

@router.get("/read", response_model=RiwayatResponseList)
async def read_riwayat(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db: AsyncSession = Depends(get_db)
):

    """
    ## Mengambil semua List Ref Jenis Riwayat
    Membaca data Jabatan fungsional baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Ref Jenis Riwayat.
    - `page_start`: Int, Data page pertama akses page.
    - `page_limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(RefRiwayat)

    if search:
        query = query.where(RefRiwayat.nama.ilike(f"%{search}%"))

    query_total = select(func.count()).select_from(query.subquery())
    result_total = await db.execute(query_total)
    total = result_total.scalar_one_or_none()


    query = query.order_by(RefRiwayat.kode.desc()).offset(skip).limit(limit)

    result = await db.execute(query)
    data =  result.scalars().all()

    return {
        "skip" : skip, 
        "limit" : limit, 
        "total" : total, 
        "data" : data, 
    }

@router.post("/create", response_model= RiwayatResponse)
async def create_riwayat(payload: RiwayatCreate, db: AsyncSession = Depends(get_db), current_user = Depends(get_current_user)):
    
    """
    ## Membuat Ref Ref Jenis Riwayat
    Menambahkan data Ref Jenis Riwayat baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Jenis Riwayat.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
     
    query = RefRiwayat(
        kode = payload.kode,
        nama = payload.nama,
        created_by = current_user.id
    )
    db.add(query)
    await commit_or_raise_unique_conflict(db)
    await db.refresh(query)
    return query



@router.patch("/update/{id}", response_model= RiwayatResponse)
async def update_riwayat(id : str, payload: RiwayatUpdate, db: AsyncSession = Depends(get_db)):
    
    """
    ## Mengubah Ref Jenis Riwayat
    Mengubah data item Ref Jenis Riwayat di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Jenis Riwayat.
    
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    
    query = select(RefRiwayat).filter(RefRiwayat.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        HTTPException(status_code=404, detail="Data tidak ditemukan")

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await commit_or_raise_unique_conflict(db)
    await db.refresh(db_data)
    return db_data



@router.delete("/delete/{id}")
async def delete_riwayat(id : str, db: AsyncSession = Depends(get_db)):

    """
    ## Menghapus Ref Jenis Riwayat
    Menghapus data item Ref Jenis Riwayat di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(RefRiwayat).filter(RefRiwayat.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        HTTPException(status_code=404, detail="Data tidak ditemukan")

    nama = db_data.nama
    await db.delete(db_data)
    await commit_or_raise_unique_conflict(db)

    return {"message": f"Ref Riwayat : {nama}, berhasil dihapus"}
