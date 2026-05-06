from fastapi import APIRouter


router = APIRouter()


@router.get("/")
async def root():
    """
    Mengambil semua data master Jenis Hukuman Disiplin
    """
    return {
        "status": "success",
        "module": "Simpeg",
        "category": "Hukuman Disiplin",
        "data": [
            {"id": 1, "nama": "xxxxx"},
            {"id": 2, "nama": "yyyyy"}
        ]
    }