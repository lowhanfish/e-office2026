# from app.schemas.simpeg.master.base_schema import MasterResponse, MasterCreate
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime


class SubUnitKerjaResponse(BaseModel):
    id : str
    nama : str
    unit_induk : bool
    penyedia_pbj : bool
    created_by : Optional[str] = None
    created_at : Optional[datetime]
    model_config = ConfigDict(from_attributes=True)

class SubUnitKerjaCreate(BaseModel):
    nama : str
    unit_induk : bool
    penyedia_pbj : bool

class SubUnitKerjaResponseList(BaseModel):
    skip : int
    limit : int
    total : int
    data : List[SubUnitKerjaResponse]