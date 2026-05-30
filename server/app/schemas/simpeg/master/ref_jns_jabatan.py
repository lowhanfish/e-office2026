
from app.schemas.simpeg.master.base_schemas import MasterBase, MasterCreate, MasterResponse
from typing import Optional


class JenisJabatanResponse(MasterResponse):
    pass

class JenisJabatanCreate(MasterCreate):
    pass

class JenisJabatanUpdate(MasterBase):
    kode : Optional[str] = None
    nama : Optional[str] = None