from fastapi import APIRouter


router = APIRouter()

@router.get("/")
async def root():
    """
    Mengambil semua data master esselon
    """
    return {
        "status": "success",
        "module": "Simpeg",
        "category": "Master Data",
        "data": [
            {"id": 1, "nama_esselon": "I.a"},
            {"id": 2, "nama_esselon": "II.a"}
        ]
    }