from app.schemas.simpeg.master.base_schemas import MasterCreate, MasterResponse, MasterBase
from typing import Optional

# --- SCHEMA UNTUK TAMBAH AGAMA ---
# Kita warisi dari MasterCreate karena butuh: kode, nama, created_by
class AgamaCreate(MasterCreate):
    pass 

# --- SCHEMA UNTUK TAMPIL DATA AGAMA ---
# Kita warisi dari MasterResponse karena butuh: id, kode, nama, created_by, created_at
class AgamaResponse(MasterResponse):
    pass

# --- SCHEMA UNTUK UPDATE AGAMA ---
# Kita gunakan MasterBase agar kode dan nama menjadi opsional saat diedit
class AgamaUpdate(MasterBase):
    kode: Optional[str] = None
    nama: Optional[str] = None