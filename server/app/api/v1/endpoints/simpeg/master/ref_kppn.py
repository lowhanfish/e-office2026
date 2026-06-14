from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.db.session import get_db
from app.schemas.simpeg.master.ref_kppn import RefKPPNCreate, RefKPPNResponse, RefKPPNUpdate
from app.models.simpeg.master.models import RefKPPN

router = APIRouter()

@router.get("/read", response_model=List[RefKPPNResponse])
async def read_ref_kppn(db:AsyncSession=Depends(get_db)):
    """
    ## Mengambil semua List Ref KPPN
    Membaca data Ref KPPN baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Ref KPPN.
    - `page_start`: Int, Data page pertama akses page.
    - `page_limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    query = select(RefKPPN)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/create", response_model=RefKPPNResponse)
async def create_ref_kppn(payload:RefKPPNCreate,db:AsyncSession=Depends(get_db)):
    """
    ## Membuat Ref KPPN
    Menambahkan data Ref KPPN baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref KPPN.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    new_data = RefKPPN(
        kode = payload.kode,
        nama = payload.nama,
        created_by = "user.id"
    )
    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data


@router.put("/update/{id}", response_model=RefKPPNResponse)
async def update_ref_kppn(id:str, payload:RefKPPNCreate, db:AsyncSession=Depends(get_db)):
    """
    ## Mengubah Ref KPPN
    Mengubah data item Ref KPPN di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref KPPN.
   
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    - `404`: Jika Id dari data yang akan diupdate tidak ditemukan.
    """
    query = select(RefKPPN).where(RefKPPN.id == id)
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
async def delete_ref_kppn(id:str, db:AsyncSession=Depends(get_db)):
    """
    ## Menghapus Ref KPPN
    Menghapus data item Ref KPPN di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.x
    - `404`: Jika Id dari data yang akan dihapus tidak ditemukan.
    """
    query = select(RefKPPN).where(RefKPPN.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Id dari data yang anda pilih tidak ditemukan")
    
    nama = db_data.nama
    await db.delete(db_data)
    await db.commit()
    return {
        "message" : f"Referensi KPPN : '{nama}', telah dihapus"
    }