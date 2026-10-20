from fastapi import APIRouter, Depends, HTTPException

from app.models.simpeg.master.models import RefJenjangJabatanFungsional
from app.db.session_simpeg import get_db
from app.api.deps import get_current_user
from .schema import JenjangJabatanFungsionalCreate, JenjangJabatanFungsionalResponse, JenjangJabatanFungsionalResponseList

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func


router = APIRouter()


@router.get("/option")
async def option():
    return {
        "status" : 200,
        "message" : "active"
    }


@router.get("/read", response_model=JenjangJabatanFungsionalResponseList)
async def read(
    skip : int = 0,
    limit : i
):
    pass
