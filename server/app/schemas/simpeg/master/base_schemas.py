from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

class MasterBase(BaseModel):
    kode : str
    nama : str

class MasterCreate(MasterBase):
    created_by : Optional[str] = None

class MasterResponse(MasterBase):
    id : str
    created_by : Optional[str] = None
    created_at : datetime
    model_config = ConfigDict(from_attributes=True)

