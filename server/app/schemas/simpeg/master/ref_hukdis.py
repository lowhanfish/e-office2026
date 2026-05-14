from app.schemas.simpeg.master.base_schemas import MasterBase, MasterCreate, MasterResponse
from pydantic import BaseModel
from typing import Optional, List


class HukdisResponse(MasterResponse):
    pass

class HukdisCreate(MasterCreate):
    pass

class HukdisUpdate():
    id : str
    kode : Optional[str] = None
    nama : Optional[str] = None

class HukdisDelete():
    id : str