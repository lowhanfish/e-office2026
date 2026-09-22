from app.schemas.simpeg.master.base_schema import MasterCreate, MasterResponse, MasterUpdate
from typing import Optional, List
from pydantic import BaseModel


class AgamaCreate(MasterCreate):
    pass

class AgamaResponse(MasterResponse):
    pass

class AgamaUpdate(MasterUpdate):
    pass

class AgamaResponseList(BaseModel):
    total : int
    skip : int
    limit : int
    data : List[AgamaResponse]
