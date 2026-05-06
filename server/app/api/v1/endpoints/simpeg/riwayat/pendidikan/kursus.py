from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def root():
    """
    Mengambil semua data Riwayat Kursus
    """
    return {
        "status": "success",
        "module": "Simpeg",
        "category": "Riwayat Kursus",
        "data": [
            {"id": 1, "nama": "xxxxxxx"},
            {"id": 2, "nama": "yyyyyyy"}
        ]
    }