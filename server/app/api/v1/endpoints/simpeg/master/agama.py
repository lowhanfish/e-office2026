from fastapi import APIRouter



router = APIRouter()


@router.get("/")
async def root():
    """
    Mengambil semua data master agama
    """
    return {
        "status": "success",
        "module": "Simpeg",
        "category": "Agama",
        "data": [
            {"id": 1, "nama": "Islam"},
            {"id": 2, "nama": "Hindu"}
        ]
    }