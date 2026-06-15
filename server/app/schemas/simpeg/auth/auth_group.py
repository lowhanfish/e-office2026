from pydantic import BaseModel, ConfigDict
from typing import Optional


class AuthGroupRespose(BaseModel):
    id : str
    nama : str
    keterangan : str
    model_config = ConfigDict(from_attributes=True)

class AuthGroupCreate(BaseModel):
    nama : str
    keterangan : str

class AuthGroupUpdate(BaseModel):
    nama : Optional[str] = None
    keterangan : Optional[str] = None

