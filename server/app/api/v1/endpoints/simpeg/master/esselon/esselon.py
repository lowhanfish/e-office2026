from app.db.transaction import commit_or_raise_unique_conflict
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, select
from app.db.session import get_db
from .schema import EsselonCreate, EsselonResponse, EsselonResponseList, EsselonUpdate
from app.models.simpeg.master.models import Esselon, User # <--- Tambah import User jika dibutuhkan type-hint
from app.api.deps import get_current_user # <--- IMPORT PAGAR GHAIB DI SINI
from typing import List

router = APIRouter()
@router.get("/read", response_model=EsselonResponseList)
# @router.get("/read")
async def read_esselon(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db: AsyncSession = Depends(get_db)
):
    
    """
    ## Mengambil semua List Esselon
    Membaca data Esselon baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari esselon.
    - `page_start`: Int, Data page pertama akses page.
    - `page_limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(Esselon)

    if(search):
        query = query.where(Esselon.nama.ilike(f"%{search}%"))

    query_total = select(func.count()).select_from(query.subquery())
    result_total = await db.execute(query_total)
    total = result_total.scalar_one_or_none()

    query = query.order_by(Esselon.kode.desc()).offset(skip).limit(limit)

    result = await db.execute(query)
    data = result.scalars().all()

    # return data
    
    return {
        "skip" : skip,
        "limit" : limit,
        "total" : total,
        "data": data
    }


@router.post("/create", response_model=EsselonResponse) # Ubah response_model ke EsselonResponse agar id & created_at ikut tampil
async def create_esselon(
    payload: EsselonCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user) # <--- DIKUNCI
):
    
    """
    ## Membuat Esselon
    Menambahkan data Esselon baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Pangkat Esselon misalkan (I.a, II.b).
    - `jabatan_asn`: **String**, nama jabatan terkait esselon. misalkan (JPT UTAMA, ADMINISTRATOR).

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    # Bapak bisa lihat di log terminal siapa yang sedang nge-create data
    print(f"User yang membuat data: {current_user.username}")
    
    new_Data = Esselon(
        kode = payload.kode,
        nama = payload.nama,
        jabatan_asn = payload.jabatan_asn,
        created_by = current_user.id
    )
    db.add(new_Data)
    await commit_or_raise_unique_conflict(db)
    await db.refresh(new_Data)
    return new_Data


@router.put("/update/{id}", response_model=EsselonResponse)
async def update_esselon(
    id: str, 
    payload: EsselonUpdate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user) # <--- DIKUNCI
):
    
    """
    ## Mengubah Esselon
    Mengubah data item Esselon di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Pangkat Esselon misalkan (I.a, II.b).
    - `jabatan_asn`: **String**, nama jabatan terkait esselon. misalkan (JPT UTAMA, ADMINISTRATOR).

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(Esselon).filter(Esselon.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()
    
    if not db_data:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await commit_or_raise_unique_conflict(db)
    await db.refresh(db_data)
    return db_data


@router.delete("/delete/{id}")
async def delete_esselon( # Diperbaiki nama fungsinya biar tidak bentrok dengan fungsi update di atas
    id: str, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user) # <--- DIKUNCI
):
    
    """
    ## Menghapus Esselon
    Menghapus data item Esselon di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    query = select(Esselon).filter(Esselon.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")
    
    await db.delete(db_data)
    await commit_or_raise_unique_conflict(db)

    return {"message": f"Esselon {db_data.nama} berhasil dihapus oleh {current_user.username}"}
