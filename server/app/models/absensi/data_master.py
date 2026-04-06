from app.db.maindb import Base
from sqlalchemy import Column, String, Text, DateTime, Integer, Boolean, Double, CheckConstraint
from sqlalchemy.sql import func

class JenisApel(Base):
    __tablename__ = "jenisapel"
    id = Column(Integer, autoincrement=True, unique=True, primary_key=True, index=True)
    uraian = Column(String(150), nullable=False)
    keterangan = Column(Text, nullable=True)
    createdBy = Column(String(35), nullable=False)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
    editedBy = Column(String(35), nullable=True)
    editedAt = Column(DateTime(timezone=True), server_default=func.now())

class JenisApelPeserta(Base):
    __tablename__ = "jenisapelpeserta"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    jenisapel = Column(Integer, index=True, nullable=False)
    unit_kerja = Column(String(35), index=True, nullable=False)

class JenisIzin(Base):
    __tablename__ = "jenisizin"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    uraian =  Column(String(150), nullable=False)
    keterangan =  Column(Text, nullable=True)
    createdBy =  Column(String(35), nullable=False)
    createdAt =  Column(DateTime(timezone=True), server_default=func.now())
    editedBy =  Column(String(35), nullable=True)
    editedAt =  Column(DateTime(timezone=True), server_default=func.now())


class JenisKategori(Base):
    __tablename__ = "jeniskategori"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    uraian = Column(String(250), nullable=False)
    hari = Column(Integer, default=0)
    keterangan = Column(Text, nullable=True)
    status = Column(Boolean, default=True)
    createdBy = Column(String(35), nullable=False)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
    editedBy = Column(String(35), nullable=True)
    editedAt = Column(DateTime(timezone=True), nullable=True, server_default=func.now())

class JenisKategoriLokasi(Base):
    __tablename__ = "jeniskategorilokasi"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    uraian = Column(String(250), nullable=False)
    keterangan = Column(Text, nullable=True)
    status = Column(Boolean, default=True)
    createdBy = Column(String(35), nullable=False)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
    editedBy = Column(String(35), nullable=True)
    editedAt = Column(DateTime(timezone=True), nullable=True, server_default=func.now())


class JenisLokasi(Base):
    __tablename__ = "jenislokasi"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    uraian = Column(String(250), nullable=False)
    jeniskategorilokasi = Column(Integer, nullable=False, index=False)
    lat = Column(Double, nullable=False)
    lng = Column(Double, nullable=False)
    rad = Column(Double, nullable=False)
    keterangan = Column(Text, nullable=True)
    status = Column(Integer, default=False)
    file = Column(Text, nullable=True)
    unit_kerja = Column(String(35), nullable=False, index=True)
    verifikator = Column(String(35), nullable=True)
    verify_at = Column(DateTime(timezone=True), server_default=func.now())
    hidex = Column(Integer, default=0)
    createdBy = Column(String(35), nullable=False)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
    editedBy = Column(String(35), nullable=True)
    editedAt = Column(DateTime(timezone=True), nullable=True, server_default=func.now())

    __table_args__ = (
        CheckConstraint("status BETWEEN 1 AND 10", name="jenislokasi_status"),
        CheckConstraint("hidex BETWEEN 1 AND 10", name="jenislokasi_hidex")
    )
