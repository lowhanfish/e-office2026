from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime, ForeignKey, Enum, SmallInteger, func
from sqlalchemy.orm import relationship
import uuid
import enum

from app.db.session import Base

class Riwayat(Base):
    __tablename__ = "riwayat_jabatan"
    id = Column(String(50), primary_key=True, index=True, nullable=False, default=lambda:str(uuid.uuid4()))
    pnsId = Column()
    instansiId = Column()
    instansiIndukId = Column()
    satuanKerjaId = Column()
    unorId = Column()
    eselonId = Column()
    jenisJabatan = Column()
    jabatanFungsionalId = Column()
    jabatanFungsionalUmumId = Column()
    nomorSk = Column()
    tanggalSk = Column()
    tmtJabatan = Column()
    tmtPelantikan = Column()

