from app.db.transaction import commit_or_raise_unique_conflict
from fastapi import APIRouter, HTTPException, Depends
from .schema import JenisJabatanCreate, JenisJabatanResponse, JenisJabatanUpdate, JenisJabatanResponseList
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.api.deps import get_current_user
from app.models.simpeg.master.models import JenisJabatan
from sqlalchemy import select, func


router = APIRouter()

@router.get("/read", response_model = JenisJabatanResponseList)
async def read_JenisJabatan(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db:AsyncSession = Depends(get_db)
):
    """
    ## Mengambil semua List Jenis Jabatan
    Membaca data Jenis Jabatan baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Jenis Jabatan.
    - `page_start`: Int, Data page pertama akses page.
    - `page_limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(JenisJabatan)

    if search:
        query = query.where(JenisJabatan.nama.ilike(f"%{search}%"))

    query_total = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(query_total)
    total = total_result.scalar_one_or_none()


    query = query.order_by(JenisJabatan.created_at.asc()).offset(skip).limit(limit)

    result = await db.execute(query)

    data =  result.scalars().all()

    return {
        "skip" : skip,
        "limit" : limit,
        "total" : total,
        "data" : data
    }


@router.post("/create", response_model=JenisJabatanResponse)
async def read_JenisJabatan(payload: JenisJabatanCreate, db: AsyncSession = Depends(get_db), current_user = Depends(get_current_user)):
    
    """
    ## Membuat Jenis Jabatan
    Menambahkan data Jenis Jabatan baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Jenis Jabatan.
    
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    new_data = JenisJabatan(
        kode = payload.kode,
        nama = payload.nama,
        created_by = current_user.id
    )

    db.add(new_data)
    await commit_or_raise_unique_conflict(db)
    await db.refresh(new_data)
    return new_data


@router.patch("/update/{id}")
async def read_JenisJabatan(id:str, payload:JenisJabatanUpdate ,db:AsyncSession = Depends(get_db)):
    
    """
    ## Mengubah Jabfung
    Mengubah data item Esselon di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Jenis Jabatan.
   
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(JenisJabatan).filter(JenisJabatan.id == id)
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
async def read_JenisJabatan(id:str, db:AsyncSession = Depends(get_db)):

    """
    ## Menghapus Jenis Jabatan
    Menghapus data item Jenis Jabatan di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(JenisJabatan).filter(JenisJabatan.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")
    
    await db.delete(db_data)
    await commit_or_raise_unique_conflict(db)
    return {"message": f"Esselon {db_data.nama} berhasil dihapus"}
