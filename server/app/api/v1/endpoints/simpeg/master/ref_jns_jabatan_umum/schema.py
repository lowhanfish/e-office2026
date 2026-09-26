
from app.schemas.simpeg.master.base_schema import MasterBase, MasterCreate, MasterResponse
from typing import Optional, List
from pydantic import BaseModel


class JenisJabatanUmumResponse(MasterResponse):
    pass

class JenisJabatanUmumCreate(MasterCreate):
    pass

class JenisJabatanUmumUpdate(MasterBase):
    kode : Optional[str] = None
    nama : Optional[str] = None

class JenisJabatanUmumResponseList(BaseModel):
    skip : int = 0
    limit : int = 100
    total : int = 0
    data : List[JenisJabatanUmumResponse] = []
