from app.schemas.simpeg.master.base_schemas import MasterBase, MasterCreate, MasterResponse
from typing import Optional

class ResponseRumpunJabatanJF(MasterResponse):
    kode_rumpun : str

class CreateRumpunJabatanJF(MasterCreate):
    kode_rumpun : str

class UpdateRumpunJabatanJF(MasterBase):
    id : Optional[str] = None
    kode : Optional[str] = None
    nama : Optional[str] = None
    kode_rumpun : Optional[str] = None

