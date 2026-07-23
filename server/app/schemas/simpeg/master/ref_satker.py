from pydantic import BaseModel
from app.schemas.simpeg.master.base_schemas import MasterBase, MasterCreate, MasterResponse
from pydantic import BaseModel
from typing import Optional, List

class SatkerResponse(MasterResponse):
    instansi_id : str
    instansi_nama : str

class SatkerCreat(MasterCreate):
    instansi_id : str

class SatkerUpdate(BaseModel):
    kode : Optional[str] = None
    nama : Optional[str] = None
    instansi_id : Optional[str] = None


class SatkerResponseList(BaseModel):
    total : int
    skip : int
    limit : int
    data : List[SatkerResponse]