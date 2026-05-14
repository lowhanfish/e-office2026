from fastapi import APIRouter
from app.schemas.simpeg.master.ref_hukdis import HukdisCreate, HukdisUpdate, HukdisResponse
from typing import List

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



@router.post("/read", response_model=List[HukdisResponse])
async def read_hukdis():
    pass

@router.post("/create", response_model=HukdisCreate)
async def create_hukdis():
    pass

@router.post("update/{id}", response_model=HukdisUpdate)
async def update_hukdis():
    pass

@router.post("/delete/{id}", response_model=HukdisResponse)
async def delete_hukdis():
    pass