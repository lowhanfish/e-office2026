from fastapi import APIRouter, Depends, HTTPException
from app.schemas.simpeg.master.ref_kel_jabatan import KelJabatanResponse, KelJabatanCreate, KelJabatanUpdate
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from sqlalchemy.future import select
from app.models.simpeg_models import KelJabatan

router = APIRouter()


@router.get("/read", response_model=List[KelJabatanResponse])
async def create_KelJabatan(db: AsyncSession = Depends(get_db)):
    """
    ## Mengambil semua List Jabatan Fungsional
    Membaca data Jabatan fungsional baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Jabfung.
    - `page_start`: Int, Data page pertama akses page.
    - `page_limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """


    query = select(KelJabatan)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model=KelJabatanResponse)
async def create_KelJabatan(payload : KelJabatanCreate, db : AsyncSession = Depends(get_db)):
    """
    ## Membuat Ref Jabfung
    Menambahkan data Jabfung baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Jabatan Fungsional.
    - `ref_jns_jabatan_id`: **String**, di ambil dari Referensi `kode` Jenis Jabatan.
    - `ref_rumpun_jabatan_id`: **String**, di ambil dari Referensi `kode` Rumpun Jabatan.
    - `pembina_id`: **String**, di ambil dari Referensi `kode` Pembina.
    

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    
    new_data = KelJabatan(
        kode = payload.kode,
        nama = payload.nama,
        ref_jns_jabatan_id = payload.ref_jns_jabatan_id,
        ref_rumpun_jabatan_id = payload.ref_rumpun_jabatan_id,
        pembina_id = payload.pembina_id,
        created_by = "user.created_by"
    )
    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data

@router.put("/update/{id}")
async def create_KelJabatan(id:str, payload : KelJabatanUpdate, db: AsyncSession = Depends(get_db)):
    
    """
    ## Mengubah Ref Jabfung
    Mengubah data item Jabfung di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Jabatan Fungsional.
    - `ref_jns_jabatan_id`: **String**, di ambil dari Referensi `kode` Jenis Jabatan.
    - `ref_rumpun_jabatan_id`: **String**, di ambil dari Referensi `kode` Rumpun Jabatan.
    - `pembina_id`: **String**, di ambil dari Referensi `kode` Pembina.
    
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    
    query = select(KelJabatan).filter(KelJabatan.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="data tidak ditemukan")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await db.commit()
    await db.refresh(db_data)
    return db_data

@router.delete("/delete/{id}")
async def create_KelJabatan(id:str, db: AsyncSession = Depends(get_db)):

    """
    ## Menghapus Ref Jabfung
    Menghapus data item Esselon di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(KelJabatan).filter(KelJabatan.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")
    
    await db.delete(db_data)
    await db.commit()

    return {
        "message" : f"Referensi Kelompok Jabatan '{db_data.nama}' telah dihapus"
    }