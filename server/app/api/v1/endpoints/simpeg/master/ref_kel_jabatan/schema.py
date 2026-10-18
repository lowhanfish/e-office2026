from app.schemas.simpeg.master.base_schema import MasterBase, MasterResponse, MasterCreate
from typing import Optional, List
from pydantic import BaseModel


class KelJabatanResponse(MasterResponse):
    ref_jns_jabatan_id : str
    ref_jns_jabatan_nama : Optional[str] | None = None
    ref_rumpun_jabatan_id : str
    ref_rumpun_jabatan_nama : Optional[str] | None = None
    pembina_id : str
    pembina_nama : Optional[str] | None = None


class KelJabatanCreate(MasterCreate):
    ref_jns_jabatan_id : str
    ref_rumpun_jabatan_id : str
    pembina_id : str

class KelJabatanUpdate(MasterBase):
    kode : Optional[str] = None
    nama : Optional[str] = None
    ref_jns_jabatan_id : Optional[str] = None
    ref_rumpun_jabatan_id : Optional[str] = None
    pembina_id : Optional[str] = None

class KelJabatanResponseList(BaseModel):
    skip : int = 0
    limit : int = 100
    total : int
    data : List[KelJabatanResponse]


# class JenisJabatanResponse(MasterResponse):
#     pass

# class JenisJabatanCreate(MasterCreate):
#     pass

# class JenisJabatanUpdate(MasterBase):
#     id : Optional[str] = None
#     kode : Optional[str] = None
#     nama : Optional[str] = None
