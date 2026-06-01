from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas.simpeg.master.ref_instansi import InstansiCreate, InstansiResponse, InstansiUpdate
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from sqlalchemy.future import select
from app.models.simpeg_models import Instansi

router = APIRouter()



@router.get("/read", response_model=List[InstansiResponse])
async def read_Instansi(db:AsyncSession = Depends(get_db)):

    """
    ## Mengambil semua List Instansi
    Membaca data Instansi baru dari sistem.

    **Parameter:**
    - `search`   : String, Untuk mencari data value dari Instansi.
    - `page_start`: Int, Data page pertama akses page.
    - `page_limit` : Int, Jumlah data yang ditarik.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(Instansi)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model=InstansiResponse)
async def create_Instansi(payload : InstansiCreate, db:AsyncSession = Depends(get_db)):
    
    """
    ## Membuat Ref Instansi
    Menambahkan data Instansi baru ke dalam sistem.

    **Parameter:**
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Instansi.
    - `kode_cepat`: **String**, harus unik (sebaiknya di ambil dari `kode_cepat` tabel referensi BKN).
    - `jenis`: **String**, Jenis instansi (**P** : Pusat, **D** : Daerah).
    - `jenis_instansi_id`: **String**, jenis instansi (**KO**: Kementerian Koordinator, **KEMENT**: Kementerian, **LPNK**: Lembaga non Kementerian, **LNS**: Lembaga non Struktural, **PROV**: Provinsi, **KAB**: Kabupaten, **KOTA**: Kota).

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    
    query = Instansi(
        kode = payload.kode,
        kode_cepat = payload.kode_cepat,
        nama = payload.nama,
        jenis = payload.jenis,
        jenis_instansi_id = payload.jenis_instansi_id,
        created_by = payload.created_by,
    )

    db.add(query)
    await db.commit()
    await db.refresh(query)
    return query


@router.put("/update/{id}", response_model=InstansiResponse)
async def update_Instansi(id:str, payload: InstansiUpdate, db: AsyncSession = Depends(get_db)):
    
    """
    ## Mengubah Instansi
    Mengubah data item Instansi di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Parameter:**
    *(Parameter dapat dihapus jika tidak diperlukan)*
    - `kode`: **String**, harus unik (sebaiknya di ambil dari `id` tabel referensi BKN).
    - `nama`: **String**, Nama Instansi.
    - `kode_cepat`: **String**, harus unik (sebaiknya di ambil dari `kode_cepat` tabel referensi BKN).
    - `jenis`: **String**, Jenis instansi (**P** : Pusat, **D** : Daerah).
    - `jenis_instansi_id`: **String**, jenis instansi (**KO**: Kementerian Koordinator, **KEMENT**: Kementerian, **LPNK**: Lembaga non Kementerian, **LNS**: Lembaga non Struktural, **PROV**: Provinsi, **KAB**: Kabupaten, **KOTA**: Kota).

    
    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """
    
    query = select(Instansi).filter(Instansi.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="id data yang anda pilih tidak di temukan")

    update_data = payload.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        if hasattr(db_data, key):
            setattr(db_data, key, value)

    await db.commit()
    await db.refresh(db_data)
    return db_data


@router.delete("/delete/{id}")
async def delete_Instansi(id:str, db: AsyncSession = Depends(get_db)):

    """
    ## Menghapus Instansi
    Menghapus data item Instansi di dalam sistem.

    **Key Path:**
    - `id`: **String**, Di ambil dari `id` data item yang akan kita ubah.

    **Error yang mungkin terjadi:**
    - `422`: Jika format input tidak sesuai skema.
    """

    query = select(Instansi).filter(Instansi.id == id)
    result = await db.execute(query)
    db_data = result.scalar_one_or_none()

    if not db_data:
        raise HTTPException(status_code=404, detail="id data yang anda pilih tidak di temukan")
    
    await db.delete(db_data)
    await db.commit()

    return {
        "message" : f"Referensi Instansi '{db_data.nama}' telah dihapus"
    }