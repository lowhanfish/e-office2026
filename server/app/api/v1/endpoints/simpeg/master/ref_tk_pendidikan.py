from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas.simpeg.master.ref_tk_pendidikan import RefTKPendidikanCreate, RefTKPendidikanResponse, RefTKPendidikanUpdate
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from sqlalchemy.future import select
from app.models.simpeg.master.models import RefTKPendidikan

router = APIRouter()



@router.get("/read", response_model=List[RefTKPendidikanResponse])
async def read_ref_tk_pendidikan(db:AsyncSession = Depends(get_db)):
    """
    ## Mengambil semua List Ref Tk Pendidikan
    Membaca data Ref Tk Pendidikan baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Ref Tk Pendidikan.
    - `page_start`: Int, Data page pertama akses page.
    - `page_limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    query = select(RefTKPendidikan)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model=RefTKPendidikanResponse)
async def create_ref_tk_pendidikan(payload: RefTKPendidikanCreate, db:AsyncSession = Depends(get_db)):
    
    """
    ## Membuat Ref Tk Pendidikan
    Menambahkan data Ref Tk Pendidikan baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Tk Pendidikan.
    - `group_tk_pend_nm`: **String**, Nama Group Tk. Pendidikan (ex : SD/MI, SLTP/MTs, SLTA/SMK/MA/D-I dst). untuk lengkapnya lihat di tabel referensi BKN.
    - `keterangan`: **String**, penjelasan singkat jika diperlukan (optional).
   
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    new_data = RefTKPendidikan(
        kode = payload.kode,
        nama = payload.nama,
        group_tk_pend_nm = payload.group_tk_pend_nm,
        keterangan = payload.keterangan,
        created_by = "user.id",
    )
    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data

@router.put("/update/{id}", response_model=RefTKPendidikanResponse)
async def update_ref_tk_pendidikan(id:str, payload:RefTKPendidikanUpdate, db:AsyncSession = Depends(get_db)):
    
    """
    ## Mengubah Ref Tk Pendidikan
    Mengubah data item Ref Tk Pendidikan di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Tk Pendidikan.
    - `group_tk_pend_nm`: **String**, Nama Group Tk. Pendidikan (ex : SD/MI, SLTP/MTs, SLTA/SMK/MA/D-I dst). untuk lengkapnya lihat di tabel referensi BKN.
    - `keterangan`: **String**, penjelasan singkat jika diperlukan (optional).

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(RefTKPendidikan).where(RefTKPendidikan.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="id dari data yang anda pilih tidak ditemukan")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await db.commit()
    await db.refresh(db_data)
    return db_data


@router.delete("/delete/{id}")
async def delete_ref_tk_pendidikan(id:str, db:AsyncSession = Depends(get_db)):

    """
    ## Menghapus Ref Tk Pendidikan
    Menghapus data item Ref Tk Pendidikan di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(RefTKPendidikan).where(RefTKPendidikan.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="id dari data yang anda pilih tidak ditemukan")
    
    nama = db_data.nama
    await db.delete(db_data)
    await db.commit()

    return {"message": f"Ref Riwayat : {nama}, berhasil dihapus"}
 
    