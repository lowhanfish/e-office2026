from pydantic import BaseModel
from app.schemas.simpeg.master.base_schemas import MasterBase, MasterCreate, MasterResponse
from typing import Optional


class RefJabatanFungsionalUmumResponse(MasterResponse):
    kode_cepat : str
    status : bool

class RefJabatanFungsionalUmumCreate(MasterCreate):
    kode_cepat : str
    status : bool

class RefJabatanFungsionalUmumUpdate(BaseModel):
    kode : Optional[str] = None
    nama : Optional[str] = None
    kode_cepat : Optional[str] = None
    status : Optional[bool] = None
