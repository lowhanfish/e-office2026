from app.schemas.simpeg.master.base_schema import MasterResponse, MasterResponseList, MasterCreate
from pydantic import BaseModel
from typing import List, Optional


class RefJabatanStrukturalResponse(MasterResponse):
    kode_cepat : str
    ref_esselon_id : Optional[str]
    ref_unor_id : Optional[str]
    ref_esselon_nama : Optional[str]
    ref_unor_nama : Optional[str]
    ref_unor_parent_nama : Optional[str]
    sub_unit_kerja_nama : Optional[str]
    status : bool


class RefJabatanStrukturalCreate(MasterCreate):
    kode_cepat : str
    ref_esselon_id : Optional[str]
    ref_unor_id : Optional[str]
    status : bool

class RefJabatanStrukturalResponseList(BaseModel):
    skip : int = 0
    limit : int = 100
    total : int
    data : List[RefJabatanStrukturalResponse]
   