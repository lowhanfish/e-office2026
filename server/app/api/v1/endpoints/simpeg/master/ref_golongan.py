from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.schemas.simpeg.master.ref_golongan import RefGolonganCreate, RefGolonganResponse, RefGolonganUpdate
from app.db.session import get_db
from app.models.simpeg.master.models import RefGolongan

router = APIRouter()

@router.get("/read", response_model=List[RefGolonganResponse])
async def read_ref_golongan(
    db:AsyncSession = Depends(get_db),
    skip : int = 0,
    limit : int = 100,
    search: str | None = None,
):
    """
    ## Mengambil semua List Ref Golongan
    Membaca data Ref Golongan baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Ref Golongan.
    - `page_start`: Int, Data page pertama akses page.
    - `page_limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    query = select(RefGolongan)
    if search:
        query = query.where(RefGolongan.nama.ilike(f"%{search}%"))

    query = query.offset(skip).limit(limit).order_by(RefGolongan.created_at.asc())

    result = await db.execute(query)
    return result.scalars().all()


@router.post("/create", response_model=RefGolonganResponse)
async def create_ref_golongan(payload:RefGolonganCreate, db:AsyncSession = Depends(get_db)):
    """
    ## Membuat Ref Golongan
    Menambahkan data Ref Golongan baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Golongan (ex : III/b).
    - `nama_pangkat`: **String**, Nama Pangkat dari ref golongan (ex: Penata Muda Tingkat I).
    - `gol_pppk`: **String**, Pangkat Ref Golongan PPPK yang setara (ex: X).
    
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    new_data = RefGolongan(
        kode = payload.kode,
        nama = payload.nama,
        nama_pangkat = payload.nama_pangkat,
        gol_pppk = payload.gol_pppk,
        created_by = "user.id",
    )
    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data


@router.put("/update/{id}", response_model=RefGolonganResponse)
async def update_ref_golongan(id:str, payload:RefGolonganUpdate, db:AsyncSession = Depends(get_db)):
    """
    ## Mengubah Ref Golongan
    Mengubah data item Ref Golongan di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
     - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Golongan (ex : III/b).
    - `nama_pangkat`: **String**, Nama Pangkat dari ref golongan (ex: Penata Muda Tingkat I).
    - `gol_pppk`: **String**, Pangkat Ref Golongan PPPK yang setara (ex: X).
   
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    query = select(RefGolongan).where(RefGolongan.id == id)
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
async def delete_ref_golongan(id:str, db:AsyncSession = Depends(get_db)):
    """
    ## Menghapus Ref Golongan
    Menghapus data item Ref Golongan di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    query = select(RefGolongan).where(RefGolongan.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Id dari data yang anda pilih tidak ditemukan")
    
    nama = db_data.nama
    await db.delete(db_data)
    await db.commit()
    return {"message": f"Ref Golongan {nama} berhasil dihapus"}