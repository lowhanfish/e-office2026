from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.db.session import get_db
from app.models.simpeg_models import RefLokasi
from app.schemas.simpeg.master.ref_lokasi import RefLokasiCreate, RefLokasiResponse, RefLokasiUpdate

router = APIRouter()


@router.get("/read", response_model=List[RefLokasiResponse])
async def read_ref_lokasi(db:AsyncSession = Depends(get_db)):
    """
    ## Mengambil semua List Ref Lokasi
    Membaca data Ref Lokasi baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Ref Lokasi.
    - `page_start`: Int, Data page pertama akses page.
    - `page_limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    query = select(RefLokasi)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model=RefLokasiResponse)
async def create_ref_lokasi(payload: RefLokasiCreate, db:AsyncSession = Depends(get_db)):
    """
    ## Membuat Ref Lokasi
    Menambahkan data Ref Lokasi baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Lokasi.
    - `kanreg_id`: **String**, Id dari kanreg (Lihat di tabel referensi BKN).
    - `ref_lokasi_id`: **String**, Merujuk ke id data lain pada tabel ref_lokasi ini sendiri (Pola Child-Parent).
    - `kode_cepat`: **String**, Kode Cepat dari Ref Lokasi (sebaiknya di ambil dari `kode_cepat` tabel referensi BKN).
    - `ref_jns_lokasi_id`: **String**, Merujuk ke id dari tabel ref_jns_lokasi.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    new_data = RefLokasi(
        kode = payload.kode,
        nama = payload.nama,
        kanreg_id = payload.kanreg_id,
        ref_lokasi_id = payload.ref_lokasi_id,
        kode_cepat = payload.kode_cepat,
        ref_jns_lokasi_id = payload.ref_jns_lokasi_id,
        created_by = "user.id"
    )

    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data

@router.put("/update/{id}", response_model=RefLokasiResponse)
async def update_ref_lokasi(id:str, payload: RefLokasiUpdate, db:AsyncSession = Depends(get_db)):
    """
    ## Mengubah Ref Lokasi
    Mengubah data item Ref Lokasi di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Lokasi.
    - `kanreg_id`: **String**, Id dari kanreg (Lihat di tabel referensi BKN).
    - `ref_lokasi_id`: **String**, Merujuk ke id data lain pada tabel ref_lokasi ini sendiri (Pola Child-Parent).
    - `kode_cepat`: **String**, Kode Cepat dari Ref Lokasi (sebaiknya di ambil dari `kode_cepat` tabel referensi BKN).
    - `ref_jns_lokasi_id`: **String**, Merujuk ke id dari tabel ref_jns_lokasi.
   
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    - `404`: Jika Id dari data yang akan diupdate tidak ditemukan.
    """
    query = select(RefLokasi).where(RefLokasi.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="id dari data yang anda tuju tidak ditemukan")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await db.commit()
    await db.refresh(db_data)
    return db_data


@router.delete("/delete/{id}")
async def delete_ref_lokasi(id:str, db:AsyncSession = Depends(get_db)):
    """
    ## Menghapus Ref Lokasi
    Menghapus data item Ref Lokasi di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.x
    - `404`: Jika Id dari data yang akan dihapus tidak ditemukan.
    """
    query = select(RefLokasi).where(RefLokasi.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="id dari data yang anda tuju tidak ditemukan")
    
    nama = db_data.nama
    await db.delete(db_data)
    await db.commit()
    return {
        "message" : f"Referensi Lokasi : '{nama}', telah dihapus"
    }