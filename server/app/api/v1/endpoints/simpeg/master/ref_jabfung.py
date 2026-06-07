from fastapi import APIRouter, Depends, HTTPException
from app.schemas.simpeg.master.ref_jabfung import RefJabfungCreate, RefJabfungResponse, RefJabfungUpdate
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.session import get_db
from app.models.simpeg_models import RefJabatanFungsional
from typing import List

router = APIRouter()

@router.get("/read", response_model=List[RefJabfungResponse])
async def read_jabfung(db:AsyncSession = Depends(get_db)):
    """
    ## Mengambil semua List Ref Jabatan Fungsional
    Membaca data Ref Jabatan Fungsional baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Ref Jabatan Fungsional.
    - `page_start`: Int, Data page pertama akses page.
    - `page_limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    query = select(RefJabatanFungsional)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model=RefJabfungResponse)
async def create_jabfung(payload: RefJabfungCreate, db:AsyncSession = Depends(get_db)):
    """
    ## Membuat Ref Jabatan Fungsional
    Menambahkan data Ref Jabatan Fungsional baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Jabatan Fungsional.
    - `bup_usia`: **Int**, Batas Usia Pensiun.
    - `kode_cepat`: **String**, Kode Cepat dari Ref Jabatan Fungsional (sebaiknya di ambil dari `kode_cepat` tabel referensi BKN).
    - `ref_kel_jabatan_id`: **String**, di ambil dari kode pada tabel ref_kel_jabatan.
    - `jenjang`: **String**, Kode dari jenjang jabatan fungsional. **PM, TR, MH, PY** (Pemula, Terampil, Mahir, Penyelia) **PT, MU, MA, UT** (Pertama, Muda Madya, Utama).
    - `status`: **String**, Kode dari status jabatan fungsional. **N** (untuk jabatan yang masih berlaku), **O** (untuk jabatan yang tidak digunakan).

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    data = RefJabatanFungsional(
        kode = payload.kode,
        kode_cepat = payload.kode_cepat,
        bup_usia = payload.bup_usia,
        nama = payload.nama,
        ref_kel_jabatan_id = payload.ref_kel_jabatan_id,
        jenjang = payload.jenjang,
        status = payload.status,
        created_by = "payload.user"
    )

    db.add(data)
    await db.commit()
    await db.refresh(data)

    return data


@router.put("/update/{id}")
async def update_jabfung(id:str, payload: RefJabfungUpdate, db : AsyncSession = Depends(get_db)):
    """
    ## Mengubah Ref Jabatan Fungsional
    Mengubah data item Ref Jabatan Fungsional di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Jabatan Fungsional.
    - `bup_usia`: **Int**, Batas Usia Pensiun.
    - `kode_cepat`: **String**, Kode Cepat dari Ref Jabatan Fungsional (sebaiknya di ambil dari `kode_cepat` tabel referensi BKN).
    - `ref_kel_jabatan_id`: **String**, di ambil dari kode pada tabel ref_kel_jabatan.
    - `jenjang`: **String**, Kode dari jenjang jabatan fungsional. **PM, TR, MH, PY** (Pemula, Terampil, Mahir, Penyelia) **PT, MU, MA, UT** (Pertama, Muda Madya, Utama).
    - `status`: **String**, Kode dari status jabatan fungsional. **N** (untuk jabatan yang masih berlaku), **O** (untuk jabatan yang tidak digunakan).

   
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    - `404`: Jika Id dari data yang akan diupdate tidak ditemukan.
    """
    query = select(RefJabatanFungsional).filter(RefJabatanFungsional.id == id)
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


@router.delete("/delete/{id}")
async def delete_jabfung(id:str, db:AsyncSession = Depends(get_db)):
    """
    ## Menghapus Ref Jabatan Fungsional
    Menghapus data item Ref Jabatan Fungsional di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    - `404`: Jika Id dari data yang akan dihapus tidak ditemukan.
    """
    query = select(RefJabatanFungsional).filter(RefJabatanFungsional.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")

    await db.delete(data_db)
    await db.commit()

    return {
        "message" : f"Referensi jabatan fungsional '{data_db.nama}' telah dihapus"
    }

