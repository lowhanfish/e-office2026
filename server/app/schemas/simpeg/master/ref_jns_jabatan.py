
from app.schemas.simpeg.master.base_schemas import MasterBase, MasterCreate, MasterResponse
from typing import Optional


class JenisJabatanResponse(MasterResponse):
    pass

class JenisJabatanCreate(MasterCreate):
    pass

class JenisJabatanUpdate(MasterBase):
    id : Optional[str] = None
    kode : Optional[str] = None
    nama : Optional[str] = None