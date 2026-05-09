from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime, CHAR
from sqlalchemy.sql import func
import uuid

from app.db.session import Base


class Agama(Base):
    __tablename__ = "jns_agama"
    id = Column(String(35), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(2), index=True, nullable=False)
    nama = Column(String(100), nullable=False)
    created_by = Column(String(35), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Esselon(Base):
    __tablename__ = "jns_esselon"
    id = Column(String(35), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(CHAR(2), index=True, nullable=False)
    nama = Column(String(10), nullable=False)
    jabatan_asn = Column(String(50), nullable=False)
    created_by = Column(String(35), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# class RumpunJabatan(Base):
#     __tablename__ = "jns_rumpun_jabatan"

class JenisJabatan(Base):
    __tablename__ = "jns_jabatan"
    id = Column(String(35), primary_key=True, index=True, default=lambda:str(uuid.uuid4))
    kode = Column(CHAR(2), index=True, nullable=False)
    nama = Column(String(50), nullable=False)
    created_by = Column(String(35), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), default=func.now())

# class KelJabatan(Base):
#     __tablename__ = "jns_kel_jabatan"

class JnsHukdis(Base):
    __tablename__ = "jns_hukdis"
    id = Column(String(35), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(35), index=True, nullable=False)
    nama = Column(String(100), nullable=False)


