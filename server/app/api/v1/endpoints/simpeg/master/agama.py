from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.session import get_db
from app.schemas.simpeg.master.agama import AgamaCreate, AgamaResponse, AgamaUpdate
from app.services.simpeg.master_service import crud_agama

router = APIRouter()

# Tampil Semua Data
@router.get("/", response_model=List[AgamaResponse])
async def read_agama(db: AsyncSession = Depends(get_db), skip: int = 0, limit: int = 100):
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
    return await crud_agama.get_multi(db, skip=skip, limit=limit)

# Tambah Data
@router.post("/create", response_model=AgamaResponse)
async def create_agama(payload: AgamaCreate, db: AsyncSession = Depends(get_db)):
    """
    ## Membuat Ref Agama
    Menambahkan data Agama baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Agama.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    # .model_dump() mengubah schema Pydantic jadi Dictionary Python
    return await crud_agama.create(db, obj_in=payload.model_dump())

# Edit Data (Metode POST)
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

# Hapus Data (Metode POST)
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