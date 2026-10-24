
from typing import Optional
from app.schemas.simpeg.master.base_schema import MasterCreate, MasterResponse, MasterBase
from app.models.simpeg.master.models import StatusJabfung
from typing import List
from pydantic import BaseModel

class RefJabfungResponse(MasterResponse):
    kode_cepat : str
    bup_usia : int
    ref_kel_jabatan_id : str
    jenjang : str
    status : StatusJabfung
    ref_kel_jabatan_nama : str
    jenjang_nama : str

class RefJabfungCreate(MasterCreate):
    kode_cepat : str
    bup_usia : int
    ref_kel_jabatan_id : str
    jenjang : str
    status : StatusJabfung

class RefJabfungUpdate(MasterBase):
    id : str
    kode_cepat : Optional[str] = None
    bup_usia : Optional[int]= None
    ref_kel_jabatan_id : Optional[str]= None
    jenjang : Optional[str] = None
    status : Optional[StatusJabfung] = None

class RefJabfungResponseList(MasterResponse):
    skip : int = 0
    limit : int = 100
    total : int
    data : List[RefJabfungResponse]
