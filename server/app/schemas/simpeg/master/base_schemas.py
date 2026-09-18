from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, List

class MasterBase(BaseModel):
    kode : str
    nama : str

class MasterCreate(MasterBase):
    pass

class MasterUpdate(MasterBase):
    pass

class MasterResponse(MasterBase):
    id : str
    created_by : Optional[str] = None
    created_at : datetime
    model_config = ConfigDict(from_attributes=True)

class MasterResponseList(BaseModel):
    total : int
    skip : int
    limit : int
    data : List[MasterResponse]

