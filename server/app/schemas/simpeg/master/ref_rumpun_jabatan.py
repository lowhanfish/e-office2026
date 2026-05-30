from app.schemas.simpeg.master.base_schemas import MasterBase, MasterCreate, MasterResponse
from typing import List, Optional


class ResponseRumpunJabatan(MasterResponse):
    kode_cepat : str

class CreateRumpunJabatan(MasterCreate):
    kode_cepat : str

class UpdateRumpunJabatan(MasterBase):
    kode : Optional[str] = None
    nama : Optional[str] = None
    kode_cepat : Optional[str] = None


