from app.schemas.simpeg.master.base_schemas import MasterCreate, MasterResponse, MasterUpdate
from typing import Optional

class RefLokasiResponse(MasterResponse):
    kanreg_id : str
    ref_lokasi_id : Optional[str] = None
    kode_cepat : str
    ref_jns_lokasi_id : str

class RefLokasiCreate(MasterCreate):
    kanreg_id : str
    ref_lokasi_id : Optional[str] = None
    kode_cepat : str
    ref_jns_lokasi_id : str

class RefLokasiUpdate(MasterUpdate):
    kanreg_id : Optional[str] = None
    ref_lokasi_id : Optional[str] = None
    kode_cepat : Optional[str] = None
    ref_jns_lokasi_id : Optional[str] = None