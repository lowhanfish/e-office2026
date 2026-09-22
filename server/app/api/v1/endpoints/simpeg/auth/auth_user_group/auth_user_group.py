from fastapi import APIRouter

# Schema and service placeholders live beside this endpoint module.



router = APIRouter()


@router.get("/read")
async def auth_user_group_read():
    return {
        "status" : 200,
        "message" : "auth_user_group_read active"
    }
