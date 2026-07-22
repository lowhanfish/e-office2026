import jwt
from fastapi import Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.session import get_db
from app.models.simpeg.master.models import User
from app.core.security import JWT_SECRET_KEY, ALGORITHM

# Nama cookie disamakan dengan yang dipakai saat login.
ACCESS_TOKEN_COOKIE_NAME = "access_token"

async def get_current_user(
    request: Request,
    db: AsyncSession = Depends(get_db)
) -> User:
    """
    Dependency ini mengambil access token dari cookie HttpOnly.
    Jadi frontend tidak perlu menyimpan token di localStorage atau sessionStorage.
    """

    # 1. Ambil token langsung dari cookie yang dikirim browser.
    token = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)

    # 2. Siapkan error standar jika token tidak ada atau bermasalah.
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token tidak valid atau telah kedaluwarsa",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # 3. Kalau cookie token kosong, langsung tolak request.
    if not token:
        raise credentials_exception
    
    try:
        # 4. Dekode JWT menggunakan secret key yang sesuai.
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        
        # 5. Ambil ID user yang kita simpan di claim 'sub'.
        user_id: str = payload.get("sub")
        token_type: str = payload.get("type")
        
        # 6. Pastikan ini memang access token, bukan refresh token.
        if user_id is None or token_type != "access":
            raise credentials_exception
            
    except jwt.PyJWTError:
        # 7. Jika token expired, palsu, atau rusak, request ditolak.
        raise credentials_exception

    # 8. Cari user di database untuk memastikan akun masih valid.
    query = select(User).filter(User.id == user_id)
    result = await db.execute(query)
    user = result.scalar_one_or_none()
    
    if user is None:
        raise credentials_exception
        
    # 9. Jika semua aman, kembalikan data user yang sedang login.
    return {
        "id" : user.id,
        "user" : user.username,
        "email" : user.email,
        "nama_lengkap" : user.nama_lengkap,
        "nip" : user.nip
    }
