from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime



class AuthMenuResponse(BaseModel):
    id : str
    title : str
    path : str
    icon : str
    color_icon : str
    color_text : str
    parent_id : Optional[str] = None
    created_at : datetime
    created_by : str
    model_config = ConfigDict(from_attributes=True)

class AuthMenuCreate(BaseModel):
    title : str
    path : str
    icon : str
    color_icon : str
    color_text : str
    parent_id : Optional[str] = None
    created_by : str

class AuthMenuUpdate(BaseModel):
    id : Optional[str]= None
    title : Optional[str]= None
    path : Optional[str]= None
    icon : Optional[str]= None
    color_icon : Optional[str]= None
    color_text : Optional[str]= None
    parent_id : Optional[str]= None
    created_by : Optional[str]= None