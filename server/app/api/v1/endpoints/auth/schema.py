from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


class LoginPayload(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    message: str
    token_type: str = "bearer"


class RefreshPayload(BaseModel):
    refresh_token: Optional[str] = None


class RefreshResponse(BaseModel):
    message: str
    token_type: str = "bearer"


class RegisterPayload(BaseModel):
    username: str
    email: EmailStr
    password: str
    nama_lengkap: Optional[str] = None
    nip: Optional[str] = None


class UserResponse(BaseModel):
    id: str
    username: str
    email: EmailStr
    nama_lengkap: Optional[str]
    nip: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
