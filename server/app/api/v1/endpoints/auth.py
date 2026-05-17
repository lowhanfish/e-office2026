import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

from app.db.session import get_db
from app.models.simpeg_models import User
from app.core.security import (
    verify_password, 
    get_password_hash,  # <--- Tambahan untuk hash password saat register
    create_access_token, 
    create_refresh_token,
    JWT_REFRESH_SECRET_KEY,
    ALGORITHM
)

router = APIRouter()

# ==========================================
# 1. PYDANTIC SCHEMAS (REQUEST & RESPONSE)
# ==========================================

class LoginPayload(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class RefreshPayload(BaseModel):
    refresh_token: str

class RefreshResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

# --- TAMBAHAN SCHEMAS UNTUK REGISTER ---
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


# ==========================================
# 2. ENDPOINTS
# ==========================================

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(payload: RegisterPayload, db: AsyncSession = Depends(get_db)):
    """
    Endpoint untuk mendaftarkan user/pegawai baru ke dalam sistem.
    Password akan otomatis di-hash demi keamanan.
    """
    # 1. Validasi apakah username sudah digunakan
    query_username = select(User).filter(User.username == payload.username)
    res_username = await db.execute(query_username)
    if res_username.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Username sudah terdaftar"
        )
    
    # 2. Validasi apakah email sudah digunakan
    query_email = select(User).filter(User.email == payload.email)
    res_email = await db.execute(query_email)
    if res_email.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Email sudah terdaftar"
        )

    # 3. Amankan password menggunakan bcrypt melalui CryptContext
    hashed_password = get_password_hash(payload.password)

    # 4. Petakan data ke model SQLAlchemy
    new_user = User(
        username=payload.username,
        email=payload.email,
        hashed_password=hashed_password,
        nama_lengkap=payload.nama_lengkap,
        nip=payload.nip
    )

    # 5. Simpan ke database
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    
    return new_user


@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginPayload, db: AsyncSession = Depends(get_db)):
    """
    Pintu masuk utama sistem (Login).
    Memvalidasi username & password, lalu menghasilkan Access + Refresh Token.
    """
    # 1. Cari user berdasarkan username di database
    query = select(User).filter(User.username == payload.username)
    result = await db.execute(query)
    user = result.scalar_one_or_none()
    
    # 2. Jika user tidak ditemukan
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Username atau password salah"
        )
        
    # 3. Cek apakah passwordnya cocok dengan hash di DB
    if not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Username atau password salah"
        )
    
    # 4. Jika sukses, cetak Access Token (15 mnt) and Refresh Token (7 hari)
    access_token = create_access_token(subject=user.id)
    refresh_token = create_refresh_token(subject=user.id)
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }


@router.post("/refresh", response_model=RefreshResponse)
async def refresh_token(payload: RefreshPayload, db: AsyncSession = Depends(get_db)):
    """
    Endpoint otomatis untuk Next.js.
    Menukar Refresh Token yang masih aktif menjadi Access Token baru 
    tanpa memaksa user mengetik password ulang.
    """
    try:
        # 1. Bongkar refresh token menggunakan secret key khusus refresh
        token_data = jwt.decode(payload.refresh_token, JWT_REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        
        user_id: str = token_data.get("sub")
        token_type: str = token_data.get("type")
        
        # 2. Pastikan token yang dibawa berjenis 'refresh'
        if user_id is None or token_type != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Refresh token tidak valid"
            )
            
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Refresh token telah kedaluwarsa atau rusak"
        )

    # 3. Validasi ke DB untuk memastikan akun user tersebut masih ada/aktif
    query = select(User).filter(User.id == user_id)
    result = await db.execute(query)
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="User tidak ditemukan"
        )

    # 4. Cetak Access Token BARU yang segar (berlaku 15 menit ke depan)
    new_access_token = create_access_token(subject=user.id)
    
    return {
        "access_token": new_access_token,
        "token_type": "bearer"
    }