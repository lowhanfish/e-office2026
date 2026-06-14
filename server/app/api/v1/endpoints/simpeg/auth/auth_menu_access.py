from fastapi import APIRouter



router = APIRouter()


@router.get("/read")
async def auth_menu_access_read():
    return {
        "status" : 200,
        "message" : "auth_menu_access_read active"
    }