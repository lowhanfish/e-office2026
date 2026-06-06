from app.schemas.simpeg.master.base_schemas import MasterBase, MasterCreate, MasterResponse
from typing import Optional

class RumpunPendidikanResponse(MasterResponse):
    kode_cepat : str

class RumpunPendidikanCreate(MasterCreate):
    kode_cepat : str

class RumpunPendidikanUpdate(MasterBase):
    kode : Optional[str] = None
    nama : Optional[str] = None
    kode_cepat : Optional[str] = None