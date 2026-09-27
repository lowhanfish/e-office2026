from app.schemas.simpeg.master.base_schema import MasterBase, MasterCreate, MasterResponse
from typing import List, Optional
from pydantic import BaseModel


class ResponseRumpunJabatan(MasterResponse):
    kode_cepat : str

class CreateRumpunJabatan(MasterCreate):
    kode_cepat : str

class UpdateRumpunJabatan(MasterBase):
    kode : Optional[str] = None
    nama : Optional[str] = None
    kode_cepat : Optional[str] = None

class ResponseRumpunJabatanList(BaseModel):
    skip : int = 0
    limit : int = 100
    total : int = 0
    data : List[ResponseRumpunJabatan]
