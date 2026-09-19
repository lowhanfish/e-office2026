from fastapi import APIRouter


router = APIRouter()


@router.get("/")
async def test():
    return {
        "status" : 200,
        "message" : "endpoint activate"
    }