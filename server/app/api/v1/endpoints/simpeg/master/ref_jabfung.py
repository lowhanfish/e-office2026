from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def root():
    """
    Mengambil semua data master Jenis Hukuman Jabatan Fungsional
    """
    return {
        "status": "success",
        "module": "Simpeg",
        "category": "Jabatan Fungsional",
        "data": [
            {"id": 1, "nama": "xxxxx"},
            {"id": 2, "nama": "yyyyy"}
        ]
    }