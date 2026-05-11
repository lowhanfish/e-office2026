from fastapi import APIRouter


router = APIRouter()



@router.get("/")
async def root():
    """
    Mengambil semua data master Jenis Hukuman Jabatan Fungsional Umum
    """
    return {
        "status": "success",
        "module": "Simpeg",
        "category": "Jabatan Fungsional Umum",
        "data": [
            {"id": 1, "nama": "xxxxx"},
            {"id": 2, "nama": "yyyyy"}
        ]
    }