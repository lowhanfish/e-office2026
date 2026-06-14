from fastapi import APIRouter, Depends, HTTPException
from app.schemas.simpeg.master.ref_rumpun_jabatan_jf import CreateRumpunJabatanJF, ResponseRumpunJabatanJF, UpdateRumpunJabatanJF
from typing import List
from app.db.session import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.simpeg.master.models import RumpunJabatanJF

router = APIRouter()


@router.get("/read", response_model=List[ResponseRumpunJabatanJF])
async def read_RumpunJabatanJF(db: AsyncSession = Depends(get_db)):

    """
    ## Mengambil semua List Rumpun Jabatan JF
    Membaca data Rumpun Jabatan JF baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Rumpun Jabatan JF.
    - `page_start`: Int, Data page pertama akses page.
    - `page_limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(RumpunJabatanJF)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model=ResponseRumpunJabatanJF)
async def create_RumpunJabatanJF(payload : CreateRumpunJabatanJF, db:AsyncSession = Depends(get_db)):
    """
    ## Membuat Rumpun Jabatan JF
    Menambahkan data Rumpun Jabatan JF baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Rumpun Jabatan JF.
    - `kode_rumpun`: **String**, diambil dari Referensi `kode` Rumpun Jabatan.
   
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    
    new_data = RumpunJabatanJF(
        kode = payload.kode,
        kode_rumpun = payload.kode_rumpun,
        nama = payload.nama,
        created_by = "user.created_by"
    )
    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data

@router.put("/update/{id}")
async def update_RumpunJabatanJF(id:str, payload: UpdateRumpunJabatanJF, db:AsyncSession = Depends(get_db)):
    
    """
    ## Mengubah Rumpun Jabatan JF
    Mengubah data item Esselon di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Rumpun Jabatan JF.
    - `kode_rumpun`: **String**, diambil dari Referensi `kode` Rumpun Jabatan.
    
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(RumpunJabatanJF).filter(RumpunJabatanJF.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code= 404, detail="data not found")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(data_db, key):
            setattr(data_db, key, value)

    await db.commit()
    await db.refresh(data_db)
    return data_db

@router.delete("/delete/{id}")
async def delete_RumpunJabatanJF(id:str, db:AsyncSession = Depends(get_db)):
    query = select(RumpunJabatanJF).filter(RumpunJabatanJF.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="data not found")
    
    nama = data_db.nama
    await db.delete(data_db)
    await db.commit()

    return {"message": f"Ref RumpunJabatanJF : {nama}, berhasil dihapus"}