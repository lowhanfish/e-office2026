from fastapi import APIRouter
from . import esselon, agama, jns_hukdis, jns_jabfung_umum, jns_jabfung, jns_kel_jabatan, jns_riwayat

master_router = APIRouter()

master_router.include_router(esselon.router, prefix='/esselon', tags=["SIMPEG - Master Esselon"])
master_router.include_router(agama.router, prefix="/agama", tags=["SIMPEG - Master Agama"])
master_router.include_router(jns_hukdis.router, prefix="/jns_hukdis", tags=["SIMPEG - Jenis Hukuman Disiplin"])
master_router.include_router(jns_jabfung_umum.router, prefix="/jns_jabfung_umum", tags=["SIMPEG - Jenis Jabatan Fungsional Umum"])
master_router.include_router(jns_jabfung.router, prefix="/jns_jabfung", tags=["SIMPEG - Jenis Jabatan Fungsional"])
master_router.include_router(jns_kel_jabatan.router, prefix="/jns_kel_jabatan", tags=["SIMPEG - Jenis Kelompok Jabatan"])
master_router.include_router(jns_riwayat.router, prefix="/jns_riwayat", tags=["SIMPEG - Jenis Riwayat"])