from app.schemas.simpeg.master.base_schema import MasterBase, MasterCreate, MasterResponse
from pydantic import BaseModel
from typing import Optional, List



class EsselonResponse(MasterResponse):
    jabatan_asn : str

class EsselonResponseList(BaseModel):
    skip : int
    limit : int
    total : int
    data : List[EsselonResponse]


class EsselonCreate(MasterCreate):
    jabatan_asn : Optional[str] = None

class EsselonUpdate(MasterBase):
    kode : Optional[str] = None
    nama : Optional[str] = None
    jabatan_asn : Optional[str] = None

class EsselonDelete(BaseModel):
    pass
