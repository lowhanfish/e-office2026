from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.schemas.simpeg.master.ref_jns_kawin import RefJnsKawinCreate, RefJnsKawinResponse, RefJnsKawinUpdate, RefJnsKawinResponseList
from app.db.session import get_db
from app.models.simpeg.master.models import RefJnsKawin
from sqlalchemy.sql import func

router = APIRouter()

@router.get("/read", response_model=RefJnsKawinResponseList)
async def read_ref_jns_kawin(
    db:AsyncSession = Depends(get_db),
    skip:int = 0,
    limit:int = 100,
    search:str | None = None
):
    """
    ## Mengambil semua List Ref Jenis Kawin
    Membaca data Ref Jenis Kawin baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Ref Jenis Kawin.
    - `skip`: Int, Data page pertama akses page.
    - `limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    query = select(RefJnsKawin)

    if search:
        query = query.where(RefJnsKawin.nama.ilike(f"%{search}%"))

    total_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(total_query)
    total = total_result.scalar_one_or_none()

    query = (
        query.order_by(RefJnsKawin.created_at.asc())
        .offset(skip)
        .limit(limit)
    )

    result = await db.execute(query)
    data =  result.scalars().all()
    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "data": data,
    }



@router.post("/create", response_model=RefJnsKawinResponse)
async def creat_ref_jns_kawin(payload: RefJnsKawinCreate, db:AsyncSession = Depends(get_db)):
    """
    ## Membuat Ref Jenis Kawin
    Menambahkan data Ref Jenis Kawin baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Jenis Kawin.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    new_data = RefJnsKawin(
        kode = payload.kode,
        nama = payload.nama,
        created_by = "user.id",
    )

    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data


@router.put("/update/{id}", response_model=RefJnsKawinResponse)
async def update_ref_jns_kawin(id:str, payload:RefJnsKawinUpdate, db:AsyncSession = Depends(get_db)):
    """
    ## Mengubah Ref Jenis Kawin
    Mengubah data item Ref Jenis Kawin di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Ref Jenis Kawin.
   
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    - `404`: Jika Id dari data yang akan diupdate tidak ditemukan.
    """
    query =  select(RefJnsKawin).where(RefJnsKawin.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Id dari data yang anda pilih tidak ditemukan")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key,value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await db.commit()
    await db.refresh(db_data)
    return db_data



@router.delete("/delete/{id}")
async def delete_ref_jns_kawin(id:str, db:AsyncSession = Depends(get_db)):
    """
    ## Menghapus Ref Jenis Kawin
    Menghapus data item Ref Jenis Kawin di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.x
    - `404`: Jika Id dari data yang akan dihapus tidak ditemukan.
    """
    query =  select(RefJnsKawin).where(RefJnsKawin.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Id dari data yang anda pilih tidak ditemukan")
    
    nama = db_data.nama
    await db.delete(db_data)
    await db.commit()
    return {
        "message" : f"Referensi Jenis Pegawai : '{nama}', telah dihapus"
    }

