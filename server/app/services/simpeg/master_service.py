from app.services.base import CRUDBase
from app.models.simpeg_models import Agama, RefHukdis, Esselon, RefRiwayat

# Membuat instance CRUD untuk masing-masing tabel
crud_agama = CRUDBase(Agama)
crud_hukdis = CRUDBase(RefHukdis)
crud_esselon = CRUDBase(Esselon)
crud_riwayat = CRUDBase(RefRiwayat)