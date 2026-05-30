from fastapi import APIRouter, HTTPException, Depends
from app.schemas.simpeg.master.ref_jns_jabatan import JenisJabatanCreate, JenisJabatanResponse, JenisJabatanUpdate
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.models.simpeg_models import JenisJabatan
from sqlalchemy.future import select

router = APIRouter()


@router.get("/")
async def root():
    """
    Mengecek Router Jenis Jabatan
    """
    return {
        "status": "success",
        "module": "Simpeg",
        "category": "Jumpun Jabatan JF",
        "data": "active"
    }


@router.get("/read", response_model = List[JenisJabatanResponse])
async def read_JenisJabatan(db:AsyncSession = Depends(get_db)):
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
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/create", response_model=JenisJabatanResponse)
async def read_JenisJabatan(payload : JenisJabatanCreate, db:AsyncSession = Depends(get_db)):
    
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
        created_by = "user.created_by"
    )

    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data


@router.put("/update/{id}")
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
    
    await db.commit()
    await db.refresh(db_data)
    return db_data


@router.delete("/delete/")
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
    await db.commit()
    return {"message": f"Esselon {db_data.nama} berhasil dihapus"}
