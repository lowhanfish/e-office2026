from fastapi import APIRouter, Depends, HTTPException
from app.schemas.simpeg.master.ref_rumpun_pendidikan import RumpunPendidikanCreate, RumpunPendidikanResponse, RumpunPendidikanUpdate
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from sqlalchemy.future import select
from app.models.simpeg_models import RumpunPendidikan

router = APIRouter()

@router.get("/read", response_model=List[RumpunPendidikanResponse])
async def read_rumpun_pendidikan(db:AsyncSession = Depends(get_db)):

    """
    ## Mengambil semua List Ref Ref Rumpun Pendidikan
    Membaca data Jabatan fungsional baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Ref Ref Rumpun Pendidikan.
    - `page_start`: Int, Data page pertama akses page.
    - `page_limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(RumpunPendidikan)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/create", response_model=RumpunPendidikanResponse)
async def create_rumpun_pendidikan(payload: RumpunPendidikanCreate, db: AsyncSession = Depends(get_db)):

    """
    ## Membuat Ref Ref Ref Rumpun Pendidikan
    Menambahkan data Ref Ref Rumpun Pendidikan baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Ref Rumpun Pendidikan.
    - `kode_cepat`: **String**, Kode Cepat Ref Rumpun Pendidikan (sebaiknya di ambil dari `kode_cepat` tabel referensi BKN).

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = RumpunPendidikan(
        kode = payload.kode,
        nama = payload.nama,
        kode_cepat = payload.kode_cepat,
        created_by = "user.id",
    )
    db.add(query)
    await db.commit()
    await db.refresh(query)
    return query


@router.put("/update/{id}", response_model=RumpunPendidikanResponse)
async def update_rumpun_pendidikan(id:str, payload : RumpunPendidikanUpdate, db:AsyncSession = Depends(get_db)):
    
    """
    ## Mengubah Ref Ref Rumpun Pendidikan
    Mengubah data item Ref Ref Rumpun Pendidikan di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Ref Rumpun Pendidikan.
    - `kode_cepat`: **String**, Kode Cepat Ref Rumpun Pendidikan (sebaiknya di ambil dari `kode_cepat` tabel referensi BKN).
    
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    
    query = select(RumpunPendidikan).filter(RumpunPendidikan.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Id Data yang anda pilih tidak ditemukan")

    update_data = payload.model_dump(exclude_unset=True)    
    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await db.commit()
    await db.refresh(db_data)
    return db_data


@router.delete("/delete/{id}")
async def delete_rumpun_pendidikan(id:str,  db:AsyncSession = Depends(get_db)):

    """
    ## Menghapus Ref Ref Rumpun Pendidikan
    Menghapus data item Ref Ref Rumpun Pendidikan di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(RumpunPendidikan).filter(RumpunPendidikan.id == id)
    result = await db.execute(query)

    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="id Data yang anda pilih tidak di temukan")

    nama = db_data.nama
    await db.delete(db_data)
    await db.commit()

    return {"message": f"Ref Rumpun Pendidikan : {nama}, berhasil dihapus"} 
