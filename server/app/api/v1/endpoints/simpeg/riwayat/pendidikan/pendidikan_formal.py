from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def root():
    """
    Mengambil semua data Riwayat Pendidikan Formal
    """
    return {
        "status": "success",
        "module": "Simpeg",
        "category": "Riwayat Pendidikan Formal",
        "data": [
            {"id": 1, "nama": "xxxxxxx"},
            {"id": 2, "nama": "yyyyyyy"}
        ]
    }
