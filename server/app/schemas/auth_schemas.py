from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# --- A. SKEMA UNTUK PROSES LOGIN ---
class LoginPayload(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


# --- B. SKEMA REFRESH TOKEN ---
# Digunakan saat Next.js meminta Access Token baru memakai Refresh Token
class TokenRefreshPayload(BaseModel):
    refresh_token: str

class TokenRefreshResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# --- C. SKEMA UNTUK MANAJEMEN USER (REGISTRASI/RESPONSE) ---
class UserBase(BaseModel):
    username: str
    email: EmailStr
    nama_lengkap: Optional[str] = None
    nip: Optional[str] = None

class UserCreate(UserBase):
    password: str # Diisi saat frontend mendaftarkan user baru

class UserResponse(UserBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True # Mengizinkan Pydantic membaca data langsung dari ORM/SQLAlchemy