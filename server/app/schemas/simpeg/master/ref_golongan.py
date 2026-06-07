from app.schemas.simpeg.master.base_schemas import MasterCreate, MasterResponse, MasterUpdate
from typing import Optional

class RefGolonganResponse(MasterResponse):
    nama_pangkat : str
    gol_pppk : str

class RefGolonganCreate(MasterCreate):
    nama_pangkat : str
    gol_pppk : str

class RefGolonganUpdate(MasterUpdate):
    nama_pangkat : Optional[str] = None
    gol_pppk : Optional[str] = None