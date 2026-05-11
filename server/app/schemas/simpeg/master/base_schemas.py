from pydantic import BaseModel, ConfigDict
from datetime import datetime



class MasterBase(BaseModel):
    kode : str
    nama : str

class MasterCreate(MasterBase):
    created_by : str
    creted_at : datetime

class MasterResponse(MasterBase):
    id : str
    created_by : str
    creted_at : datetime
    model_config = ConfigDict(from_attributes=True)

