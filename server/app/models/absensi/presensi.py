from app.db.maindb import Base
from sqlalchemy import Column, Integer, SmallInteger, String, Text, Boolean, DateTime, CheckConstraint, UniqueConstraint,ForeignKey, Double
from sqlalchemy.sql import func



class Absensi(Base):
    __tablename__ = "absensi"
    __table_args__ = (
        {"schema" : "absensi"},
        CheckConstraint("dd BETWEEN 1 AND 31", name="absensi_dd"),
        CheckConstraint("mm BETWEEN 1 AND 12", name="absensi_mm"),
        UniqueConstraint("NIP", "dd", "mm", "yy", name="absensi_uniq_tgl")
    )

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    jenispresensi = Column(Integer, comment="diambil dari table presensi")
    JenisStatusId = Column(Integer)
    jenisKategori = Column(Integer, comment="di ambil dari tabel jenisKategori, selain kehadiran nilai =0")
    jenisizin = Column(Integer, comment="di ambil dari tabel jenisizin, selain izin nilai =0")
    lat = Column(Double, nullable=False)
    lng = Column(Double, nullable=False)
    jamDatang = Column(String(10), nullable=False, index=True)
    jamPulang = Column(String(10), nullable=False, index=True)
    dd = Column(SmallInteger, nullable=False, index=True)
    mm = Column(SmallInteger, nullable=False, index=True)
    yy = Column(SmallInteger, nullable=False, index=True)
    keterangan = Column(Text, nullable=True)
    NIP = Column(String(35), nullable=False, index=True)
    status = Column(Boolean, default=False, index=True, comment="0=proses, 1=disetujui")
    unit_kerja = Column(String(35), nullable=False,index=True)
    fileRef = Column(String(35), nullable=True)
    token = Column(Text, nullable=True)
    createdBy = Column(String(35), nullable=False)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())


