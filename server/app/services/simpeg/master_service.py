from app.services.base import CRUDBase
from app.models.simpeg_models import Agama, JnsHukdis, Esselon, JnsRiwayat

# Membuat instance CRUD untuk masing-masing tabel
crud_agama = CRUDBase(Agama)
crud_hukdis = CRUDBase(JnsHukdis)
crud_esselon = CRUDBase(Esselon)
crud_riwayat = CRUDBase(JnsRiwayat)