import os
from datetime import datetime, timedelta, timezone
from typing import Any, Union
import jwt
from passlib.context import CryptContext
from dotenv import load_dotenv

load_dotenv()

# Konfigurasi Enkripsi Password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Ambil Secret Key dari .env
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_REFRESH_SECRET_KEY = os.getenv("JWT_REFRESH_SECRET_KEY")
ALGORITHM = "HS256"

# Waktu kedaluwarsa token
ACCESS_TOKEN_EXPIRE_MINUTES = 15  # 15 Menit
REFRESH_TOKEN_EXPIRE_DAYS = 7     # 7 Hari

# --- 1. FUNGSI UNTUK PASSWORD ---
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Mengecek apakah password yang diketik cocok dengan di DB"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Mengubah password teks biasa menjadi hash acak untuk disimpan di DB"""
    return pwd_context.hash(password)

# --- 2. FUNGSI MEMBUAT ACCESS TOKEN ---
def create_access_token(subject: Union[str, Any]) -> str:
    # Set waktu expired: Waktu sekarang + 15 menit
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # Data yang dititipkan di dalam token (misal: ID User)
    to_encode = {"exp": expire, "sub": str(subject), "type": "access"}
    
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# --- 3. FUNGSI MEMBUAT REFRESH TOKEN ---
def create_refresh_token(subject: Union[str, Any]) -> str:
    # Set waktu expired: Waktu sekarang + 7 hari
    expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    
    to_encode = {"exp": expire, "sub": str(subject), "type": "refresh"}
    
    encoded_jwt = jwt.encode(to_encode, JWT_REFRESH_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt