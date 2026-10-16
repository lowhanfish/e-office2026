from app.schemas.simpeg.master.base_schema import MasterCreate, MasterResponse
from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import List, Optional

class RefUnorResponse(BaseModel):
    id : str
    nama : str
    parent_id : Optional[str]
    sub_unit_kerja : Optional[str] | None = None
    sub_unit_kerja_nama : Optional[str] | None = None
    created_by : Optional[str]
    created_at : Optional[datetime]
    model_config = ConfigDict(from_attributes=True)

class RefUnorCreate(BaseModel):
    nama : str
    parent_id : str
    sub_unit_kerja : str

class RefUnorResponseList(BaseModel):
    skip : int = 0
    limit : int = 100
    total : int
    data : List[RefUnorResponse]