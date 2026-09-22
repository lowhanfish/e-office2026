from app.schemas.simpeg.master.base_schema import MasterCreate, MasterResponse
from pydantic import BaseModel
from typing import List


class RefJenjangResponse(MasterResponse):
    kode_cepat : str
    asn_jenis_jabatan_id : str
    level_kompetensi_jabatan : str

class RefJenjangResponseList(BaseModel):
    skip : int
    limit : int
    total : int
    data : List[RefJenjangResponse]


class RefJenjangCreate(MasterCreate):
    kode_cepat : str
    asn_jenis_jabatan_id : str
    level_kompetensi_jabatan : str
