from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select


from app.db.session import get_db
from app.models.simpeg.auth.models import AuthAccess
from app.schemas.simpeg.auth.auth_menu_access import AuthAccessCreate, AuthAccessResponse, AuthAccessUpdate

router = APIRouter()


@router.get("/read", response_model=List[AuthAccessResponse])
async def auth_menu_access_read(db:AsyncSession = Depends(get_db)):
    query = select(AuthAccess)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/create", response_model=AuthAccessResponse)
async def auth_menu_access_create(payload:AuthAccessCreate, db:AsyncSession = Depends(get_db)):
    new_data = AuthAccess(
        auth_menu_id = payload.auth_menu_id,
        auth_group_id = payload.auth_group_id,
        createx = payload.createx,
        readx = payload.readx,
        updatex = payload.updatex,
        deletex = payload.deletex,
    )
    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data

@router.put("/update/{id}", response_model=AuthAccessResponse)
async def auth_menu_access_update(id:str, payload:AuthAccessUpdate, db:AsyncSession = Depends(get_db)):
    query = select(AuthAccess).where(AuthAccess.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="Id dari data yang anda pilih tidak ditemukan")

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if hasattr(data_db, key):
            setattr(data_db, key, value)

    await db.commit()
    await db.refresh(data_db)
    return data_db

@router.delete("/delete/{id}")
async def auth_menu_access_delete(id:str, db:AsyncSession = Depends(get_db)):
    query = select(AuthAccess).where(AuthAccess.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()


    if not data_db:
        raise HTTPException(status_code=401, detail="Id dari data yang anda pilih tidak ditemukan")
    
    nama = data_db.id
    await db.delete(data_db)
    await db.commit()

    return {"message": f"Data Auth Akses dengan id : {nama} berhasil dihapus dari database..!"}






   