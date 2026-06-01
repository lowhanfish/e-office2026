from app.schemas.simpeg.master.base_schemas import MasterBase, MasterCreate, MasterResponse
from pydantic import BaseModel
from typing import Optional

class InstansiResponse(MasterResponse):
    kode_cepat : str
    jenis : str
    jenis_instansi_id : str

class InstansiCreate(MasterCreate):
    kode_cepat : str
    jenis : str
    jenis_instansi_id : str

class InstansiUpdate(BaseModel):
    kode : Optional[str] = None
    kode_cepat : Optional[str] = None
    nama : Optional[str] = None
    jenis : Optional[str] = None
    jenis_instansi_id : Optional[str] = None
