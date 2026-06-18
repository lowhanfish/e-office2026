from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class AuthAccessResponse(BaseModel):
    id : str
    auth_menu_id : str
    auth_group_id : str
    createx : bool
    readx : bool
    updatex : bool
    deletex : bool
    created_at : datetime
    created_by : str

class AuthAccessCreate(BaseModel):
    auth_menu_id : str
    auth_group_id : str
    createx : bool
    readx : bool
    updatex : bool
    deletex : bool

class AuthAccessUpdate(BaseModel):
    auth_menu_id : Optional[str] = None
    auth_group_id : Optional[str] = None
    createx : Optional[bool] = None
    readx : Optional[bool] = None
    updatex : Optional[bool] = None
    deletex : Optional[bool] = None



