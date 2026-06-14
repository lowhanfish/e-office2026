from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.db.session import get_db
from app.models.simpeg.auth.models import AuthMenu
from app.schemas.simpeg.auth.auth_menu import AuthMenuCreate, AuthMenuResponse, AuthMenuUpdate

router = APIRouter()

@router.get("/read", response_model=List[AuthMenuResponse])
async def auth_menu_read(db : AsyncSession = Depends(get_db)):
    query = select(AuthMenu)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/create", response_model=AuthMenuResponse)
async def auth_menu_create(payload:AuthMenuCreate ,db : AsyncSession = Depends(get_db)):
    new_data = AuthMenu(
        title = payload.title,
        path = payload.path,
        icon = payload.icon,
        color_icon = payload.color_icon,
        color_text = payload.color_text,
        parent_id = payload.parent_id,
        created_by = "user.id",
    )

    db.add(new_data)
    await db.commit()
    await db.refresh(new_data)
    return new_data


@router.put("/update/{id}", response_model=AuthMenuResponse)
async def auth_menu_update(id:str, payload:AuthMenuUpdate, db : AsyncSession = Depends(get_db)):
    query = select(AuthMenu).where(AuthMenu.id == id)
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
async def auth_menu_delete(id:str, db : AsyncSession = Depends(get_db)):
    query = select(AuthMenu).where(AuthMenu.id == id)
    result = await db.execute(query)
    data_db = result.scalar_one_or_none()

    if not data_db:
        raise HTTPException(status_code=404, detail="id dari data yang anda pilih tidak ditemukan")
    
    nama = data_db.title
    await db.delete(data_db)
    await db.commit()
    return {"message": f"Data menu : {nama} berhasil dihapus dari database..!"}