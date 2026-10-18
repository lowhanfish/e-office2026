from app.db.transaction import commit_or_raise_unique_conflict
from fastapi import APIRouter, Depends, HTTPException
from .schema import KelJabatanResponse, KelJabatanCreate, KelJabatanUpdate, KelJabatanResponseList
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.api.deps import get_current_user
from sqlalchemy import select, func
from app.models.simpeg.master.models import KelJabatan, JenisJabatan, Instansi, RumpunJabatanJF

router = APIRouter()

@router.get("/option", response_model=List[KelJabatanResponse])
async def option(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db : AsyncSession = Depends(get_db)
):
    query = select(
        *KelJabatan.__table__.c,
        JenisJabatan.nama.label("ref_jns_jabatan_nama"),
        RumpunJabatanJF.nama.label("ref_rumpun_jabatan_nama"),
        Instansi.nama.label("pembina_nama")
    )
    query = query.outerjoin(JenisJabatan, JenisJabatan.kode == KelJabatan.ref_jns_jabatan_id)
    query = query.outerjoin(RumpunJabatanJF, RumpunJabatanJF.kode == KelJabatan.ref_rumpun_jabatan_id)
    query = query.outerjoin(Instansi, Instansi.kode == KelJabatan.pembina_id)

    if search:
        query = query.where(KelJabatan.nama.ilike(f"%{search}%"))

    query = query.order_by(KelJabatan.created_at.desc()).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.mappings().all()


@router.get("/read", response_model=KelJabatanResponseList)
async def create_KelJabatan(
    skip : int = 0,
    limit : int = 100,
    search : str | None = None,
    db: AsyncSession = Depends(get_db)
):
    """
    ## Mengambil semua List Jabatan Fungsional
    Membaca data Jabatan fungsional baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Jabfung.
    - `skip`: Int, Data page pertama akses page.
    - `limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """


    query = select(
        *KelJabatan.__table__.c,
        JenisJabatan.nama.label("ref_jns_jabatan_nama"),
        RumpunJabatanJF.nama.label("ref_rumpun_jabatan_nama"),
        Instansi.nama.label("pembina_nama")
    )
    query = query.outerjoin(JenisJabatan, JenisJabatan.kode == KelJabatan.ref_jns_jabatan_id)
    query = query.outerjoin(RumpunJabatanJF, RumpunJabatanJF.kode == KelJabatan.ref_rumpun_jabatan_id)
    query = query.outerjoin(Instansi, Instansi.kode == KelJabatan.pembina_id)

    if search:
        query = query.where(KelJabatan.nama.ilike(f"%{search}%"))

    total_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(total_query)
    total = total_result.scalar_one_or_none()

    query = query.order_by(KelJabatan.created_at.desc()).offset(skip).limit(limit)
    result = await db.execute(query)
    data = result.mappings().all()

    return {
        "skip" : skip,
        "limit" : limit,
        "total" : total,
        "data" : data,
    }

@router.post("/create", response_model=KelJabatanResponse)
async def create_KelJabatan(payload: KelJabatanCreate, db: AsyncSession = Depends(get_db), current_user = Depends(get_current_user)):
    """
    ## Membuat Ref Jabfung
    Menambahkan data Jabfung baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Jabatan Fungsional.
    - `ref_jns_jabatan_id`: **String**, di ambil dari Referensi `kode` Jenis Jabatan.
    - `ref_rumpun_jabatan_id`: **String**, di ambil dari Referensi `kode` Rumpun Jabatan.
    - `pembina_id`: **String**, di ambil dari Referensi `kode` Pembina.
    

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    
    new_data = KelJabatan(
        kode = payload.kode,
        nama = payload.nama,
        ref_jns_jabatan_id = payload.ref_jns_jabatan_id,
        ref_rumpun_jabatan_id = payload.ref_rumpun_jabatan_id,
        pembina_id = payload.pembina_id,
        created_by = current_user.id
    )
    db.add(new_data)
    await commit_or_raise_unique_conflict(db)
    await db.refresh(new_data)
    return new_data

@router.put("/update/{id}")
async def create_KelJabatan(id:str, payload : KelJabatanUpdate, db: AsyncSession = Depends(get_db)):
    
    """
    ## Mengubah Ref Jabfung
    Mengubah data item Jabfung di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Jabatan Fungsional.
    - `ref_jns_jabatan_id`: **String**, di ambil dari Referensi `kode` Jenis Jabatan.
    - `ref_rumpun_jabatan_id`: **String**, di ambil dari Referensi `kode` Rumpun Jabatan.
    - `pembina_id`: **String**, di ambil dari Referensi `kode` Pembina.
    
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    
    query = select(KelJabatan).filter(KelJabatan.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="data tidak ditemukan")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await commit_or_raise_unique_conflict(db)
    await db.refresh(db_data)
    return db_data

@router.delete("/delete/{id}")
async def create_KelJabatan(id:str, db: AsyncSession = Depends(get_db)):

    """
    ## Menghapus Ref Jabfung
    Menghapus data item Esselon di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(KelJabatan).filter(KelJabatan.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")
    
    await db.delete(db_data)
    await commit_or_raise_unique_conflict(db)

    return {
        "message" : f"Referensi Kelompok Jabatan '{db_data.nama}' telah dihapus"
    }
