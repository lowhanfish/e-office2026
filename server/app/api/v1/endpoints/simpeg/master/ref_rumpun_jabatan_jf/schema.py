from app.schemas.simpeg.master.base_schema import MasterBase, MasterCreate, MasterResponse
from typing import Optional, List
from pydantic import BaseModel

class ResponseRumpunJabatanJF(MasterResponse):
    kode_rumpun : Optional[str] = None
    kode_utama_rumpun : Optional[str] | None
    nama_rumpun : Optional[str] | None

class CreateRumpunJabatanJF(MasterCreate):
    kode_rumpun : str

class UpdateRumpunJabatanJF(MasterBase):
    id : Optional[str] = None
    kode : Optional[str] = None
    nama : Optional[str] = None
    kode_rumpun : Optional[str] = None

class ResponseRumpunJabatanJFList(BaseModel):
    skip : int = 0
    limit : int = 100
    total : int = 0
    data : List[ResponseRumpunJabatanJF]
