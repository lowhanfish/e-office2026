
from app.schemas.simpeg.master.base_schema import MasterBase, MasterCreate, MasterResponse
from typing import Optional, List
from pydantic import BaseModel


class JenisJabatanResponse(MasterResponse):
    pass

class JenisJabatanCreate(MasterCreate):
    pass

class JenisJabatanUpdate(MasterBase):
    kode : Optional[str] = None
    nama : Optional[str] = None

class JenisJabatanResponseList(BaseModel):
    skip : int
    limit : int
    total : int
    data : List[JenisJabatanResponse]

