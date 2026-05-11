
from typing import Optional
from app.schemas.simpeg.master.base_schemas import MasterCreate, MasterResponse, MasterBase
from app.models.simpeg_models import Jenjang, StatusJabfung

class RefJabfungResponse(MasterResponse):
    kode_cepat : str
    bup_usia : int
    ref_kel_jabatan_id : str
    jenjang : Jenjang
    status : StatusJabfung

class RefJabfungCreate(MasterCreate):
    kode_cepat : str
    bup_usia : int
    ref_kel_jabatan_id : str
    jenjang : Jenjang
    status : StatusJabfung

class RefJabfungUpdate(MasterBase):
    id : str
    kode_cepat : Optional[str] = None
    bup_usia : Optional[int]= None
    ref_kel_jabatan_id : Optional[str]= None
    jenjang : Optional[Jenjang] = None
    status : Optional[StatusJabfung] = None