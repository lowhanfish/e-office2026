from app.schemas.simpeg.master.base_schemas import MasterBase, MasterResponse, MasterCreate
from typing import Optional


class KelJabatanResponse(MasterResponse):
    ref_jns_jabatan_id : str
    ref_rumpun_jabatan_id : str
    pembina_id : str


class KelJabatanCreate(MasterCreate):
    ref_jns_jabatan_id : str
    ref_rumpun_jabatan_id : str
    pembina_id : str

class KelJabatanUpdate(MasterBase):
    id : Optional[str] = None
    kode : Optional[str] = None
    nama : Optional[str] = None
    ref_jns_jabatan_id : Optional[str] = None
    ref_rumpun_jabatan_id : Optional[str] = None
    pembina_id : Optional[str] = None



# class JenisJabatanResponse(MasterResponse):
#     pass

# class JenisJabatanCreate(MasterCreate):
#     pass

# class JenisJabatanUpdate(MasterBase):
#     id : Optional[str] = None
#     kode : Optional[str] = None
#     nama : Optional[str] = None