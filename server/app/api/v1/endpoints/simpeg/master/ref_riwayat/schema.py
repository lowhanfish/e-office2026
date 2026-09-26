from pydantic import BaseModel
from app.schemas.simpeg.master.base_schema import MasterBase, MasterCreate, MasterResponse
from typing import Optional, List


class RiwayatResponse(MasterResponse):
    pass

class RiwayatCreate(MasterCreate):
    pass

class RiwayatUpdate(MasterBase):
    id : str
    kode : Optional[str] = None
    nama : Optional[str] = None

class RiwayatResponseList(BaseModel):
    total : int = 0
    skip : int = 0
    limit : int = 100
    data : List[RiwayatResponse] = []
