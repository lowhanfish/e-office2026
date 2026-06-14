from fastapi import APIRouter



router = APIRouter()


@router.get("/read")
async def auth_group_read():
    return {
        "status" : 200,
        "message" : "auth_group_read active"
    }