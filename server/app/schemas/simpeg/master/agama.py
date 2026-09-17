from app.schemas.simpeg.master.base_schemas import MasterCreate, MasterResponse, MasterBase
from typing import Optional, List
from pydantic import BaseModel


class AgamaCreate(MasterCreate):
    pass 

class AgamaResponse(MasterResponse):
    pass

class AgamaUpdate(MasterBase):
    kode: Optional[str] = None
    nama: Optional[str] = None

class AgamaResponseList(BaseModel):
    total : int
    skip : int
    limit : int
    data : List[AgamaResponse]