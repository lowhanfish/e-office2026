from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel, EmailStr

from app.db.session import get_db
from app.models.simpeg_models import User # Pastikan Bapak ada model User di simpeg_models
from app.core.security import verify_password, create_access_token, create_refresh_token

router = APIRouter()

# --- SCHEMA UNTUK REQUEST & RESPONSE ---
class LoginPayload(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

# --- ENDPOINT LOGIN ---
@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginPayload, db: AsyncSession = Depends(get_db)):
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
        
    # 3. Cek apakah passwordnya cocok
    if not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Username atau password salah"
        )
    
    # 4. Jika sukses, cetak Access Token dan Refresh Token
    # Kita titipkan ID User (user.id) di dalam token tersebut
    access_token = create_access_token(subject=user.id)
    refresh_token = create_refresh_token(subject=user.id)
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }