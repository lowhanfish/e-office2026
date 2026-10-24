from fastapi import APIRouter, Depends, HTTPException
from app.api.v1.endpoints.simpeg.master.ref_jabatan_struktural.schema import RefJabatanStrukturalCreate, RefJabatanStrukturalResponse, RefJabatanStrukturalResponseList
from app.db.session_simpeg import get_db
from app.api.deps import get_current_user
from app.models.simpeg.master.models import RefJabatanStruktural, Esselon, Unor

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

@router.get("/option")
async def option():
    return {
        "status" : 200,
        "message" : "endpoint aktif"
    }


@router.get("/read")
async def option(
    db: AsyncSession = Depends(get_db)
):
    pass


@router.post("/create")
async def create(
    db: AsyncSession = Depends(get_db)
):
    pass


@router.patch("/update/{id}")
async def update(
    db: AsyncSession = Depends(get_db)
):
    pass


@router.delete("/delete/{id}")
async def delete(
    db: AsyncSession = Depends(get_db)
):
    pass
