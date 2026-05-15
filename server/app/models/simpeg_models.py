from sqlalchemy import Column, Integer, Boolean, String, Boolean, Text, DateTime, CHAR, ForeignKey, Enum, SmallInteger
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
import uuid

from app.db.session import Base


class Jenjang(enum.Enum):
    PM = "Pemula"
    TR = "Terampil"
    MH = "Mahir"
    PY = "Penyelia"
    PT = "Pertama"
    MU = "Muda"
    MA = "Madya"
    UT = "Utama"

class StatusJabfung(enum.Enum):
    N = "Jabatan yang masih berlaku"
    O = "Jabatan yang tidak berlaku"
    X = "Jabatan yang terus berlaku"

class JenisInstansi(enum.Enum):
    P = "Pusat"
    D = "Daerah"

class JenisInstansiId(enum.Enum):
    KO = "Kementerian Koordinator"
    KEMENT = "Kementerian" 
    LPNK = "Lembaga non Kementerian"
    LNS = "Lembaga non Struktural" 
    PROV = "Provinsi" 
    KAB = "Kabupaten"
    KOTA = "Kota"

    

class Agama(Base):
    __tablename__ = "ref_agama"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(2), index=True, nullable=False, unique=True)
    nama = Column(String(100), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    

class Esselon(Base):
    __tablename__ = "ref_esselon"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(CHAR(2), index=True, nullable=False, unique=True)
    nama = Column(String(10), nullable=False)
    jabatan_asn = Column(String(50), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class RumpunJabatan(Base):
    __tablename__ = "ref_rumpun_jabatan"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(50), index=True, nullable=False, unique=True)
    kode_cepat = Column(CHAR(3), index=True, nullable=True)
    nama = Column(String(250), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship
    ref_kel_jabatan = relationship("KelJabatan", back_populates="ref_rumpun_jabatan_rel")


class RumpunJabatanJF(Base):
    __tablename__ = "ref_rumpun_jabatan_jf"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(50), index=True, nullable=False, unique=True)
    kode_rumpun = Column(CHAR(3), index=True, nullable=True)
    nama = Column(String(250), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class JenisJabatan(Base):
    __tablename__ = "ref_jns_jabatan"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(CHAR(2), index=True, nullable=False, unique=True)
    nama = Column(String(50), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship
    ref_kel_jabatan = relationship("KelJabatan", back_populates="ref_jns_jabatan_rel")


class KelJabatan(Base):
    __tablename__ = "ref_kel_jabatan"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(CHAR(50), index=True, nullable=False, unique=True)
    nama = Column(String(50), nullable=False)
    ref_jabatan_id = Column(String(50), ForeignKey("ref_jabatan.kode"),index=True, nullable=False, comment="dari kolom kode tabel ref_jabatan")
    ref_rumpun_jabatan_id = Column(String(50), ForeignKey("ref_rumpun_jabatan.kode"),index=True, nullable=False, comment="dari kolom kode tabel ref_rumpun_jabatan")
    pembina_id = Column(String(50), index=True, nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship
    ref_jns_jabatan_rel = relationship("JenisJabatan", back_populates="ref_kel_jabatan")
    ref_rumpun_jabatan_rel = relationship("RumpunJabatan", back_populates="ref_kel_jabatan")
    ref_jabatan_fungsional = relationship("JnsJabatanFungsional", back_populates="ref_kel_jabatan_rel")


class JnsHukdis(Base):
    __tablename__ = "ref_hukdis"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(50), index=True, nullable=False, unique=True)
    nama = Column(String(100), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    


class JnsRiwayat(Base):
    __tablename__ = "ref_riwayat"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(50), index=True, nullable=False, unique=True)
    nama = Column(String(100), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class JnsPenugasan(Base):
    __tablename__ = "ref_jns_penugasan"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(CHAR(5), index=True, nullable=False, unique=True)
    nama = Column(String(50), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    create_at = Column(DateTime(timezone=True), server_default=func.now())


class JnsJabatanFungsional(Base):
    __tablename__ = "ref_jabatan_fungsional"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(50), index=True, nullable=False, unique=True)
    kode_cepat = Column(String(6), index=True, nullable=False, unique=True)
    nama = Column(String(250), nullable=False)
    bup_usia = Column(SmallInteger, nullable=False)
    ref_kel_jabatan_id = Column(String(50), ForeignKey("ref_kel_jabatan.kode"), index=True, nullable=False, comment="dari kolom kode tabel ref_kel_jabatan")
    jenjang = Column(Enum(Jenjang), nullable=False, index=True)
    status = Column(Enum(StatusJabfung), nullable=False, index=True)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # relationship
    ref_kel_jabatan_rel = relationship("KelJabatan", back_populates="ref_jabatan_fungsional")

class JnsJabatanFungsionalUmum(Base):
    __tablename__ = "ref_jabatan_fungsional_umum"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(50), unique=True, nullable=False)
    nama = Column(String(150), nullable=False)
    kode_cepat = Column(String(10),nullable=False)
    status = Column(Boolean, default=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class JnsTKPendidikan (Base):
    __tablename__ = "ref_tk_pendidikan"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(50), unique=True, nullable=False)
    nama = Column(String(50), nullable=False)
    group_tk_pend_nm = Column(String(50), nullable=False)
    keterangan = Column(Text, nullable=True, default="-")
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    #relationship
    ref_pendidikan_rel = relationship("JnsPendidikan", back_populates="ref_tk_pendidikan_rel")


class JnsPendidikan (Base):
    __tablename__ = "ref_pendidikan"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    ref_tk_pendidikan_id = Column(String(50), ForeignKey("ref_tk_pendidikan.kode"), index=True, nullable=False, comment="dari kolom kode tabel ref_tk_pendidikan")
    nama = Column(String(150), nullable=False)
    status = Column(Boolean, default=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    #relationship
    ref_tk_pendidikan_rel = relationship("JnsTKPendidikan", back_populates="ref_pendidikan_rel")


class JnsGolongan(Base):
    __tablename__ = "ref_golongan"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(CHAR(3), index=True, nullable=False) 
    nama = Column(CHAR(5), nullable=False)
    nama_pangkat = Column(String(25), nullable=False)
    gol_pppk = Column(CHAR(5), nullable=True)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class JnsDokumen(Base):
    __tablename__ = "ref_dokumen"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(CHAR(10), nullable=False)
    layanan_nama = Column(String(50), nullable=False)
    document = Column(String(50), nullable=False)
    file_type = Column(CHAR(5), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Instansi(Base):
    __tablename__ = "ref_instansi"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(50), index=True, nullable=False)
    kode_cepat = Column(CHAR(5), index=True, nullable=True)
    nama = Column(String(150), nullable=False)
    jenis = Column(Enum(JenisInstansi), nullable=False)
    jenis_instansi_id = Column(Enum(JenisInstansiId), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())



   
