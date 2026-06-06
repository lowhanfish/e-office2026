from app.schemas.simpeg.master.base_schemas import MasterBase, MasterCreate, MasterResponse
from typing import Optional

class RefTKPendidikanResponse(MasterResponse):
    group_tk_pend_nm : str
    keterangan : str

class RefTKPendidikanCreate(MasterCreate):
    group_tk_pend_nm : str
    keterangan : str

class RefTKPendidikanUpdate(MasterBase):
    kode : Optional[str] = None
    nama : Optional[str] = None
    group_tk_pend_nm : Optional[str] = None
    keterangan : Optional[str] = None
    