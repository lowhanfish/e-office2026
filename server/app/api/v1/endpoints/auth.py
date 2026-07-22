import jwt
from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

from app.db.session import get_db
from app.models.simpeg.master.models import User
from app.core.security import (
    verify_password, 
    get_password_hash,  # <--- Tambahan untuk hash password saat register
    create_access_token, 
    create_refresh_token,
    JWT_REFRESH_SECRET_KEY,
    ALGORITHM
)

router = APIRouter()

# Nama cookie dibuat jadi konstanta supaya konsisten dipakai di semua endpoint.
ACCESS_TOKEN_COOKIE_NAME = "access_token"
REFRESH_TOKEN_COOKIE_NAME = "refresh_token"

# ==========================================
# 1. PYDANTIC SCHEMAS (REQUEST & RESPONSE)
# ==========================================

class LoginPayload(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    message: str
    token_type: str = "bearer"

class RefreshPayload(BaseModel):
    refresh_token: Optional[str] = None

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
async def login(
    payload: LoginPayload,
    response: Response,
    db: AsyncSession = Depends(get_db)
):
    """
    Pintu masuk utama sistem (Login).
    Setelah username dan password valid, token disimpan ke HttpOnly cookie
    supaya JavaScript di browser tidak bisa membacanya langsung.
    """
    # 1. Cari user berdasarkan username di database.
    query = select(User).filter(User.username == payload.username)
    result = await db.execute(query)
    user = result.scalar_one_or_none()
    
    # 2. Jika user tidak ditemukan, kita hentikan proses login.
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Username atau password salah"
        )
        
    # 3. Cek apakah password yang diketik cocok dengan hash di database.
    if not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Username atau password salah"
        )
    
    # 4. Jika sukses, kita buat access token dan refresh token.
    access_token = create_access_token(subject=user.id)
    refresh_token = create_refresh_token(subject=user.id)

    # 5. Simpan access token ke cookie HttpOnly.
    #    Cookie ini dipakai untuk request API yang butuh autentikasi.
    response.set_cookie(
        key=ACCESS_TOKEN_COOKIE_NAME,
        value=access_token,
        httponly=True,
        secure=False,   # ubah ke True saat production HTTPS
        samesite="lax",
        max_age=15 * 60,
        path="/",
    )

    # 6. Simpan refresh token ke cookie HttpOnly juga.
    #    Cookie ini khusus dipakai saat access token sudah habis masa berlaku.
    response.set_cookie(
        key=REFRESH_TOKEN_COOKIE_NAME,
        value=refresh_token,
        httponly=True,
        secure=False,   # ubah ke True saat production HTTPS
        samesite="lax",
        max_age=7 * 24 * 60 * 60,
        path="/api/v1/auth/refresh",
    )

    # 7. Response cukup mengirim pesan sukses karena token sudah masuk ke cookie.
    return {
        "message": "Login berhasil",
        "token_type": "bearer"
    }


@router.post("/refresh", response_model=RefreshResponse)
async def refresh_token(
    request: Request,
    response: Response,
    payload: Optional[RefreshPayload] = None,
    db: AsyncSession = Depends(get_db)
):
    """
    Endpoint otomatis untuk Next.js.
    Menukar Refresh Token yang masih aktif menjadi Access Token baru 
    tanpa memaksa user mengetik password ulang.
    """
    # 1. Ambil refresh token dari body dulu, lalu fallback ke cookie.
    #    Ini bikin endpoint masih fleksibel kalau frontend lama belum pindah.
    incoming_refresh_token = payload.refresh_token if payload else None
    if not incoming_refresh_token:
        incoming_refresh_token = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)

    if not incoming_refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token tidak ditemukan"
        )

    try:
        # 2. Bongkar refresh token menggunakan secret key khusus refresh.
        token_data = jwt.decode(incoming_refresh_token, JWT_REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        
        user_id: str = token_data.get("sub")
        token_type: str = token_data.get("type")
        
        # 3. Pastikan token yang dibawa memang berjenis 'refresh'.
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

    # 4. Validasi ke DB untuk memastikan akun user tersebut masih ada/aktif.
    query = select(User).filter(User.id == user_id)
    result = await db.execute(query)
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="User tidak ditemukan"
        )

    # 4. Buat access token baru yang segar.
    new_access_token = create_access_token(subject=user.id)

    # 5. Update cookie access token dengan token baru.
    response.set_cookie(
        key=ACCESS_TOKEN_COOKIE_NAME,
        value=new_access_token,
        httponly=True,
        secure=False,   # ubah ke True saat production HTTPS
        samesite="lax",
        max_age=15 * 60,
        path="/",
    )
    
    return {
        "access_token": new_access_token,
        "token_type": "bearer"
    }


@router.post("/logout")
async def logout(response: Response):
    """
    Logout membersihkan cookie agar browser tidak lagi mengirim token lama.
    """
    response.delete_cookie(ACCESS_TOKEN_COOKIE_NAME, path="/")
    response.delete_cookie(REFRESH_TOKEN_COOKIE_NAME, path="/api/v1/auth/refresh")
    return {"message": "Logout berhasil"}
