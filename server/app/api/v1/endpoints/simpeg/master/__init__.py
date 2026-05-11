from fastapi import APIRouter
from . import esselon, agama, ref_jabfung_umum, ref_jabfung, ref_kel_jabatan, ref_riwayat, ref_hukdis

master_router = APIRouter()

master_router.include_router(esselon.router, prefix='/esselon')
master_router.include_router(agama.router, prefix="/agama")
master_router.include_router(ref_hukdis.router, prefix="/ref_hukdis")
master_router.include_router(ref_jabfung_umum.router, prefix="/ref_jabfung_umum")
master_router.include_router(ref_jabfung.router, prefix="/ref_jabfung")
master_router.include_router(ref_kel_jabatan.router, prefix="/ref_kel_jabatan")
master_router.include_router(ref_riwayat.router, prefix="/ref_riwayat")