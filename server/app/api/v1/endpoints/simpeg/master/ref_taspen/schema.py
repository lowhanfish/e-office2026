from app.schemas.simpeg.master.base_schema import MasterCreate, MasterResponse, MasterResponseList
from pydantic import BaseModel
from typing import List

class RefTaspenResponse(MasterResponse):
    ktua_id : str


class RefTaspenCreate(MasterCreate):
    ktua_id : str


class RefTaspenResponse(BaseModel):
    skip : int = 0
    limit : int = 100
    total : int
    data : List[RefTaspenResponse]