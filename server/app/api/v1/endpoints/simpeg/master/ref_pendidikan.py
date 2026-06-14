from fastapi import APIRouter, Depends, HTTPException
from app.schemas.simpeg.master.ref_pendidikan import RefPendidikanCreate, RefPendidikanResponse, RefPendidikanUpdate
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from sqlalchemy.future import select
from app.models.simpeg.master.models import RefPendidikan


router = APIRouter()

@router.get("/read", response_model=List[RefPendidikanResponse])
async def read_ref_pendidikan(db:AsyncSession = Depends(get_db)):

    """
    ## Mengambil semua List Ref Pendidikan
    Membaca data Ref Pendidikan baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Ref Pendidikan.
    - `page_start`: Int, Data page pertama akses page.
    - `page_limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(RefPendidikan)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model=RefPendidikanResponse)
async def create_ref_pendidikan(payload:RefPendidikanCreate ,db:AsyncSession = Depends(get_db)):

    """
    ## Membuat Ref Pendidikan
    Menambahkan data Ref Pendidikan baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Pendidikan.
    - `ref_tk_pendidikan_id`: **String**, Di ambil dari kode pada tabel ref_tk_pendidikan (Referensi Tk Pendidikan).
    - `status`: **Bool**, 1 = Aktif, 0 = Tidak Aktif.
   
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    new_data = RefPendidikan(
        ref_tk_pendidikan_id = payload.ref_tk_pendidikan_id,
        kode = payload.kode,
        nama = payload.nama,
        status = payload.status,
        created_by = "user.id",
    )

    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data


@router.put("/update/{id}", response_model = RefPendidikanResponse)
async def update_ref_pendidikan(id:str, payload:RefPendidikanUpdate, db:AsyncSession = Depends(get_db)):
    
    """
    ## Mengubah Ref Pendidikan
    Mengubah data item Ref Pendidikan di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Pendidikan.
    - `ref_tk_pendidikan_id`: **String**, Di ambil dari kode pada tabel ref_tk_pendidikan (Referensi Tk Pendidikan).
    - `status`: **Bool**, 1 = Aktif, 0 = Tidak Aktif.
   
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(RefPendidikan).where(RefPendidikan.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Id dari data yang anda pilih tidak ditemukan")
    
    update_data = payload.model_dump(exclude_unset=True)
    
    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await db.commit()
    await db.refresh(db_data)
    return db_data


@router.delete("/delete/{id}")
async def delete_ref_pendidikan(id:str, db:AsyncSession = Depends(get_db)):

    """
    ## Menghapus Ref Pendidikan
    Menghapus data item Ref Pendidikan di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(RefPendidikan).where(RefPendidikan.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Id dari data yang anda pilih tidak ditemukan")
    
    nama = db_data.nama

    await db.delete(db_data)
    await db.commit()
    return {"message": f"Ref Pendidikan {nama} berhasil dihapus"}
 



