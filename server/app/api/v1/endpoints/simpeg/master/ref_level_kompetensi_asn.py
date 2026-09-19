from fastapi import APIRouter, Depends
from app.models.simpeg.master.models import RefLevelKompetensiAsn, User
from app.api.deps import get_current_user
from app.db.transaction import commit_or_raise_unique_conflict

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.sql import select


router = APIRouter()


@router.get("/")
async def test():
    return {
        "status" : 200,
        "message" : "endpoint active"
    }