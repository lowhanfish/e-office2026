from fastapi import APIRouter
from . import esselon, agama, jns_hukdis, jns_jabfung_umum, jns_jabfung, jns_kel_jabatan, jns_riwayat

master_router = APIRouter()

master_router.include_router(esselon.router, prefix='/esselon')
master_router.include_router(agama.router, prefix="/agama")
master_router.include_router(jns_hukdis.router, prefix="/jns_hukdis")
master_router.include_router(jns_jabfung_umum.router, prefix="/jns_jabfung_umum")
master_router.include_router(jns_jabfung.router, prefix="/jns_jabfung")
master_router.include_router(jns_kel_jabatan.router, prefix="/jns_kel_jabatan")
master_router.include_router(jns_riwayat.router, prefix="/jns_riwayat")