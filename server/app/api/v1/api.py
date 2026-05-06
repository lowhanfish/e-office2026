from fastapi import APIRouter

from app.api.v1.endpoints.simpeg import simpeg_router


api_router = APIRouter()



api_router.include_router(
    simpeg_router, prefix="/simpeg"
)