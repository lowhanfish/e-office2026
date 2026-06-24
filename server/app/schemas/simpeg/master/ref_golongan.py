from app.schemas.simpeg.master.base_schemas import MasterCreate, MasterResponse, MasterUpdate
from pydantic import BaseModel
from typing import Optional, List

class RefGolonganResponse(MasterResponse):
    nama_pangkat : str
    gol_pppk : str

class RefGolonganCreate(MasterCreate):
    nama_pangkat : str
    gol_pppk : str

class RefGolonganUpdate(MasterUpdate):
    nama_pangkat : Optional[str] = None
    gol_pppk : Optional[str] = None

class RefGolonganResponseList(BaseModel):
    total : int
    skip : int
    limit : int
    data : List[RefGolonganResponse]    