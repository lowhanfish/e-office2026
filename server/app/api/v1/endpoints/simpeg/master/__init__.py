from fastapi import APIRouter
from . import (
    ref_jns_pegawai,
    ref_jns_kawin,
    ref_status_hidup,
    agama, 
    esselon, 
    ref_golongan,
    ref_instansi, 
    ref_satker, 
    ref_jns_lokasi,
    ref_lokasi,

    ref_jns_jabatan, 
    ref_kel_jabatan, 
    ref_rumpun_jabatan, 
    ref_rumpun_jabatan_jf, 
    ref_jabfung_umum, 
    ref_jabfung, 
    
    ref_riwayat, 
    ref_hukdis, 

    ref_rumpun_pendidikan, 
    ref_tk_pendidikan,
    ref_pendidikan,
)

master_router = APIRouter()

master_router.include_router(ref_jns_pegawai.router, prefix="/ref_jns_pegawai")
master_router.include_router(ref_jns_kawin.router, prefix="/ref_jns_kawin")
master_router.include_router(ref_status_hidup.router, prefix="/ref_status_hidup")
master_router.include_router(agama.router, prefix="/agama")
master_router.include_router(esselon.router, prefix='/esselon')
master_router.include_router(ref_golongan.router, prefix="/ref_golongan")
master_router.include_router(ref_instansi.router, prefix="/ref_instansi")
master_router.include_router(ref_satker.router, prefix="/ref_satker")
master_router.include_router(ref_jns_lokasi.router, prefix="/ref_jns_lokasi")
master_router.include_router(ref_lokasi.router, prefix="/ref_lokasi")

master_router.include_router(ref_jns_jabatan.router, prefix="/ref_jns_jabatan")
master_router.include_router(ref_kel_jabatan.router, prefix="/ref_kel_jabatan")
master_router.include_router(ref_rumpun_jabatan.router, prefix="/ref_rumpun_jabatan")
master_router.include_router(ref_rumpun_jabatan_jf.router, prefix="/ref_rumpun_jabatan_jf")
master_router.include_router(ref_jabfung_umum.router, prefix="/ref_jabfung_umum")
master_router.include_router(ref_jabfung.router, prefix="/ref_jabfung")

master_router.include_router(ref_riwayat.router, prefix="/ref_riwayat")
master_router.include_router(ref_hukdis.router, prefix="/ref_hukdis")

master_router.include_router(ref_rumpun_pendidikan.router, prefix="/ref_rumpun_pendidikan")
master_router.include_router(ref_tk_pendidikan.router, prefix="/ref_tk_pendidikan")
master_router.include_router(ref_pendidikan.router, prefix="/ref_pendidikan")