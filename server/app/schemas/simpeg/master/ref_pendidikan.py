from app.schemas.simpeg.master.base_schemas import MasterCreate, MasterResponse, MasterUpdate
from typing import Optional

class RefPendidikanResponse(MasterResponse):
    ref_tk_pendidikan_id : str
    status : bool

class RefPendidikanCreate(MasterCreate):
    ref_tk_pendidikan_id : str
    status : bool = True

class RefPendidikanUpdate(MasterUpdate):
    ref_tk_pendidikan_id : Optional[str] = None
    status : Optional[bool] = None