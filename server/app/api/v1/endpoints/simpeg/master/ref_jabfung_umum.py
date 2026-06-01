from fastapi import APIRouter, Depends, HTTPException
from app.schemas.simpeg.master.ref_jabfung_umum import RefJabatanFungsionalUmumCreate, RefJabatanFungsionalUmumResponse, RefJabatanFungsionalUmumUpdate
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.simpeg_models import RefJabatanFungsionalUmum
from app.db.session import get_db
from typing import List

router = APIRouter()

@router.get("/read",response_model=List[RefJabatanFungsionalUmumResponse])
async def read_RefJabatanFungsionalUmum(db: AsyncSession = Depends(get_db)):

    """
    ## Mengambil semua List Jabatan Fungsional Umum
    Membaca data Jabatan fungsional baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Jabatan Fungsional Umum.
    - `page_start`: Int, Data page pertama akses page.
    - `page_limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(RefJabatanFungsionalUmum)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model=RefJabatanFungsionalUmumResponse)
async def read_RefJabatanFungsionalUmum(payload : RefJabatanFungsionalUmumCreate, db :AsyncSession = Depends(get_db)):
    """
    ## Membuat Ref Jabatan Fungsional Umum
    Menambahkan data Jabatan Fungsional Umum baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Jabatan Fungsional Umum.
    - `kode_cepat`: **String**, harus unik (sebaiknya di ambil dari `kode_cepat` tabel referensi BKN).
    - `status`: **Boolean**, status jabatan (masih digunakan atau tidak).

    

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    
    query = RefJabatanFungsionalUmum(
        nama = payload.nama,
        kode = payload.kode,
        kode_cepat = payload.kode_cepat,
        status = payload.status,
        created_by = "user.id"
    )
    db.add(query)
    await db.commit()
    await db.refresh(query)
    return query


@router.put("/update/{id}", response_model=RefJabatanFungsionalUmumResponse)
async def read_RefJabatanFungsionalUmum(id:str, payload : RefJabatanFungsionalUmumUpdate, db:AsyncSession = Depends(get_db)):
    """
    ## Mengubah Jabatan Fungsional Umum
    Mengubah data item Jabatan Fungsional Umum di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Jabatan Fungsional Umum.
    - `kode_cepat`: **String**, harus unik (sebaiknya di ambil dari `kode_cepat` tabel referensi BKN).
    - `status`: **Boolean**, status jabatan (masih digunakan atau tidak).
    
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    
    query = select(RefJabatanFungsionalUmum).filter(RefJabatanFungsionalUmum.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="id data yang anda pilih tidak di temukan")

    update_data = payload.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await db.commit()
    await db.refresh(db_data)
    return db_data

@router.delete("/delete/{id}")
async def read_RefJabatanFungsionalUmum(id:str, db:AsyncSession = Depends(get_db)):
    
    """
    ## Menghapus Jabatan Fungsional Umum
    Menghapus data item Jabatan Fungsional Umum di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(RefJabatanFungsionalUmum).filter(RefJabatanFungsionalUmum.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="id data yang anda pilih tidak ditemukan")
    
    await db.delete(db_data)
    await db.commit()

    return {
        "message" : f"Referensi jabatan fungsional umum '{db_data.nama}' telah dihapus"
    }