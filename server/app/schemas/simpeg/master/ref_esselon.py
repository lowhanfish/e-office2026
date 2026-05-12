from app.schemas.simpeg.master.base_schemas import MasterBase, MasterCreate, MasterResponse
from typing import Optional


class EsselonResponse(MasterResponse):
    jabatan_asn : str

class EsselonCreate(MasterCreate):
    jabatan_asn : Optional[str] = None

class EsselonUpdate(MasterBase):
    kode : Optional[str] = None
    nama : Optional[str] = None
    jabatan_asn : Optional[str] = None