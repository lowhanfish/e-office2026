from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def root():
    """
    Mengambil semua data master Jenis Riwayat
    """
    return {
        "status": "success",
        "module": "Simpeg",
        "category": "Jenis Riwayat",
        "data": [
            {"id": 1, "nama": "xxxxx"},
            {"id": 2, "nama": "yyyyy"}
        ]
    }