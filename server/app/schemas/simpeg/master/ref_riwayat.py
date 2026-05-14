from pydantic import BaseModel
from app.schemas.simpeg.master.base_schemas import MasterBase, MasterCreate, MasterResponse
from typing import Optional


class RiwayatResponse(MasterResponse):
    pass

class RiwayatCreate(MasterCreate):
    pass

class RiwayatUpdate(MasterBase):
    id : str
    kode : Optional[str] = None
    nama : Optional[str] = None



