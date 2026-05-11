from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def root():
    """
    Mengambil semua data master Jenis Kelompok Jabatan
    """
    return {
        "status": "success",
        "module": "Simpeg",
        "category": "Kelompok Jabatan",
        "data": [
            {"id": 1, "nama": "xxxxx"},
            {"id": 2, "nama": "yyyyy"}
        ]
    }