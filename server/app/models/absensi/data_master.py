from app.db.maindb import Base
from sqlalchemy import Column, String, Text, DateTime, Integer
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
