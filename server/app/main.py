from fastapi import FastAPI
from app.api.v1.api import api_router


app = FastAPI(
    title="e-Office Konawe Selatan",
    description="Backend e-Office Konawe Selatan",
    version="3.0"
)

app.include_router(
    api_router,
    prefix="/api/v1"
)



@app.get("/")
async def root():
    return {
        "message": "Welcome to e-Office Gateway",
        "status": "Online"
    }
