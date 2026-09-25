from app.schemas.simpeg.master.base_schema import MasterCreate, MasterResponse
from pydantic import BaseModel
from typing import List, Optional


class RefJenjangResponse(MasterResponse):
    asn_jenis_jabatan_id : str
    level_kompetensi_jabatan : str
    level_kompetensi_jabatan_uraian : Optional[str] | None = None
    asn_jenis_jabatan_id_uraian : Optional[str] | None = None

class RefJenjangResponseList(BaseModel):
    skip : int
    limit : int
    total : int
    data : List[RefJenjangResponse]


class RefJenjangCreate(MasterCreate):
    asn_jenis_jabatan_id : str
    level_kompetensi_jabatan : str
