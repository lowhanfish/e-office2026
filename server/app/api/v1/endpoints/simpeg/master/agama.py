from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.session import get_db
from app.models.simpeg.master.models import Agama
from app.api.deps import get_current_user
from app.schemas.simpeg.master.agama import AgamaCreate, AgamaResponse, AgamaResponseList, AgamaUpdate
from app.services.simpeg.master_service import crud_agama

from sqlalchemy.future import select
from sqlalchemy.sql import func

router = APIRouter()


@router.get("/option")

@router.get("/", response_model=AgamaResponseList)
async def read_agama(
    db: AsyncSession = Depends(get_db), 
    skip: int = 0, 
    limit: int = 100, 
    search:str |None = None
):
    """
    ## Mengambil semua List Agama
    Membaca data Jabatan fungsional baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Agama.
    - `page_start`: Int, Data page pertama akses page.
    - `page_limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    query = select(Agama)
    if search:
        query = query.where(Agama.nama.ilike(f"%{search}%"))

    total_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(total_query)
    total = total_result.scalar_one_or_none()

    query = query.order_by(Agama.created_at.asc()).offset(skip).limit(limit)

    result = await db.execute(query)
    data = result.scalars().all()
    
    return {
        "skip" : skip,
        "limit" : limit,
        "total" : total,
        "data" : data
    }


@router.post("/create", response_model=AgamaResponse)
async def create_agama(payload: AgamaCreate, db: AsyncSession = Depends(get_db), current_user = Depends(get_current_user)):
    """
    ## Membuat Ref Agama
    Menambahkan data Agama baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Agama.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    # created_by selalu berasal dari user yang sudah terautentikasi.
    create_data = payload.model_dump()
    create_data["created_by"] = current_user.id
    return await crud_agama.create(db, obj_in=create_data)

@router.put("/update/{id}", response_model=AgamaResponse)
async def update_agama(id: str, payload: AgamaUpdate, db: AsyncSession = Depends(get_db)):
    # exclude_unset=True agar kolom yang tidak diisi di Next.js tidak merusak data lama
    """
    ## Mengubah Agama
    Mengubah data item Agama di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Agama.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    
    updated = await crud_agama.update(db, id=id, obj_in=payload.model_dump(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")
    return updated

@router.delete("/delete/{id}")
async def delete_agama(id: str, db: AsyncSession = Depends(get_db)):
    """
    ## Menghapus Agama
    Menghapus data item Agama di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    success = await crud_agama.remove(db, id=id)
    if not success:
        raise HTTPException(status_code=404, detail="Gagal menghapus data")
    return {"message": "Berhasil menghapus data"}
