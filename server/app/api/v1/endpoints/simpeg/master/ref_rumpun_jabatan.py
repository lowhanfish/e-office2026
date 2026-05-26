from fastapi import APIRouter, Depends


router = APIRouter()

@router.get("/")
async def root():
    """
    Mengecek Router Rumpun Jabatan
    """
    return {
        "status": "success",
        "module": "Simpeg",
        "category": "Jumpun Jabatan",
        "data": "active"
    }

@router.post("/read")
async def read_RumpunJabatan():
    pass

@router.post("/create")
async def read_RumpunJabatan():
    pass

@router.post("/update")
async def read_RumpunJabatan():
    pass

@router.post("/delete")
async def read_RumpunJabatan():
    pass

