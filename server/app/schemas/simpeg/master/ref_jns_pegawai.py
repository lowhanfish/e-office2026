from app.schemas.simpeg.master.base_schemas import MasterCreate, MasterResponse, MasterUpdate
from typing import List
from pydantic import BaseModel

class RefJnsPegawaiResponse(MasterResponse):
    pass

class RefJnsPegawaiCreate(MasterCreate):
    pass

class RefJnsPegawaiUpdate(MasterUpdate):
    pass

class RefJnsPegawaiResponseList(BaseModel):
    total : int
    skip : int
    limit : int
    data : List[RefJnsPegawaiResponse]    