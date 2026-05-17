import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.session import get_db
from app.models.simpeg_models import User
from app.core.security import JWT_SECRET_KEY, ALGORITHM

# OAuth2PasswordBearer otomatis mencari Header 'Authorization: Bearer <TOKEN>'
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

async def get_current_user(
    token: str = Depends(oauth2_scheme), 
    db: AsyncSession = Depends(get_db)
) -> User:
    
    # 1. Siapkan error standar jika token bermasalah
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token tidak valid atau telah kedaluwarsa",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # 2. Dekode (bongkar) token JWT menggunakan Secret Key kita
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        
        # 3. Ambil ID User yang dulu kita titipkan di dalam 'sub'
        user_id: str = payload.get("sub")
        token_type: str = payload.get("type")
        
        # Pastikan ini adalah Access Token, bukan Refresh Token yang dipakai buat akses data
        if user_id is None or token_type != "access":
            raise credentials_exception
            
    except jwt.PyJWTError:
        # Jika token expired, palsu, atau rusak, otomatis masuk ke sini
        raise credentials_exception

    # 4. Cari user-nya di database untuk memastikan usernya memang ada/aktif
    query = select(User).filter(User.id == user_id)
    result = await db.execute(query)
    user = result.scalar_one_or_none()
    
    if user is None:
        raise credentials_exception
        
    # 5. Jika semua aman, kembalikan data user yang sedang login
    return user