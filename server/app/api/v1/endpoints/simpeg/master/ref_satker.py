from fastapi import APIRouter, Depends, HTTPException
from app.schemas.simpeg.master.ref_satker import SatkerCreat, SatkerResponse, SatkerUpdate, SatkerResponseList
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.simpeg.master.models import Satker, Instansi
from app.db.session import get_db
from sqlalchemy.sql import func


router = APIRouter()

@router.get("/option", response_model=List[SatkerResponse])
async def option_satker(
    db: AsyncSession = Depends(get_db),
    search : str | None = None,
    limit : int | None = None
):
    """
    ## Mengambil semua List Satker
    untuk keperluan select atau autocomplete.
    """
    query = select(Satker)
    if search:
        query = query.where(Satker.nama.ilike(f"%{search}%"))

    if limit : 
        query = query.limit(limit)

    result = await db.execute(query)
    return result.scalars().all()



@router.get("/read", response_model=SatkerResponseList)
async def read_satker(
    db: AsyncSession = Depends(get_db),
    limit: int = 100,
    skip: int = 0,
    search: str | None = None
):

    """
    ## Mengambil semua List Satker
    Membaca data Jabatan fungsional baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Satker.
    - `skip`: Int, Data page pertama akses page.
    - `limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(
        *Satker.__table__.c,
        Instansi.nama
    )

    query = query.join(Instansi, Satker.instansi_id == Instansi.kode)

    if search:
        query = query.where(Satker.nama.ilike(f"%{search}%"))



    total_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(total_query)
    total = total_result.scalar_one_or_none() or 0

    result = await db.execute(query)
    data = result.mappings().all()

    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "data": data,
    }




@router.post("/creat", response_model=SatkerResponse)
async def create_satker(payload:SatkerCreat, db: AsyncSession = Depends(get_db)):
    """
    ## Membuat Ref Satker
    Menambahkan data Satker baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Satker.
    - `instansi_id`: **String**, di ambil dari kode tabel instansi.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = Satker(
        kode = payload.kode,
        nama = payload.nama,
        instansi_id = payload.instansi_id,
        created_by = "user.id"
    )

    db.add(query)
    await db.commit()
    await db.refresh(query)

    return query


@router.put("/update/{id}")
async def update_satker(id:str, payload : SatkerUpdate, db: AsyncSession = Depends(get_db)):
    """
    ## Mengubah Satker
    Mengubah data item Satker di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Satker.
    - `instansi_id`: **String**, di ambil dari kode tabel instansi.
    
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    
    query = select(Satker).filter(Satker.id == id)
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
async def root(id:str, db: AsyncSession = Depends(get_db)):

    """
    ## Menghapus Satker
    Menghapus data item Satker di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(Satker).filter(Satker.id == id)
    result = await db.execute(query)

    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="id dari data yang anda tuju tidak ditemukan")
    
    last_data = db_data

    await db.delete(db_data)
    await db.commit()


    return {
        "message" : f"Data Satker {last_data.nama} telah dihapus",
        "satus" : 200
    }

