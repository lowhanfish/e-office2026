from app.schemas.simpeg.master.base_schemas import MasterCreate, MasterResponse, MasterUpdate
from pydantic import BaseModel

class RefStatusHidupResponseList(BaseModel):
    total : int
    skip : int
    limit : int
    data : list[MasterResponse]


class RefStatusHidupResponse(MasterResponse):
    pass

class RefStatusHidupCreate(MasterCreate):
    pass

class RefStatusHidupUpdate(MasterUpdate):
    pass