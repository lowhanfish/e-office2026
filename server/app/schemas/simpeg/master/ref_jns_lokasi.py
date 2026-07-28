from app.schemas.simpeg.master.base_schemas import MasterCreate, MasterResponse, MasterUpdate
from pydantic import BaseModel
from typing import List

class RefJnsLokasiResponse(MasterResponse):
    pass

class RefJnsLokasiCreate(MasterCreate):
    pass

class RefJnsLokasiUpdate(MasterUpdate):
    pass

class RefJnsLokasiResponseList(BaseModel):
    total : int
    skip :int
    limit : int
    data : List[RefJnsLokasiResponse]