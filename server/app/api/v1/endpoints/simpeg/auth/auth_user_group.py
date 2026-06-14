from fastapi import APIRouter



router = APIRouter()


@router.get("/read")
async def auth_user_group_read():
    return {
        "status" : 200,
        "message" : "auth_user_group_read active"
    }