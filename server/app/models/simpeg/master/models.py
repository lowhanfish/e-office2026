from sqlalchemy import Column, Integer, Boolean, String, Boolean, Text, DateTime, CHAR, ForeignKey, Enum, SmallInteger
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
import uuid

from app.db.session import Base


class Jenjang(enum.Enum): #jenjang untuk fungsional bukan struktural
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

class User(Base):
    __tablename__ = "sys_user"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String(50), nullable=False, unique=True, index=True)
    email = Column(String(100), nullable=False, unique=True)
    
    # KUNCI KEAMANAN: Kita simpan password yang sudah di-hash di sini
    hashed_password = Column(String(255), nullable=False)
    
    nama_lengkap = Column(String(100), nullable=True)
    nip = Column(String(20), nullable=True, unique=True) # Khusus ASN/Pegawai
    
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())


class RefJnsPegawai(Base):
    __tablename__ = "ref_jns_pegawai"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(2), index=True, nullable=False, unique=True)
    nama = Column(String(100), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class RefJnsKawin(Base):
    __tablename__ = "ref_jns_kawin"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(2), index=True, nullable=False, unique=True)
    nama = Column(String(100), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class RefStatusHidup(Base):
    __tablename__ = "ref_status_hidup"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(2), index=True, nullable=False, unique=True)
    nama = Column(String(100), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

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

class Unor(Base):
    __tablename__ = "ref_unor"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(50), index=True, nullable=False, unique=True)
    nama = Column(String(100), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

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
    ref_jns_jabatan_id = Column(String(50), ForeignKey("ref_jns_jabatan.kode"),index=True, nullable=False, comment="dari kolom kode tabel ref_jns_jabatan")
    ref_rumpun_jabatan_id = Column(String(50), ForeignKey("ref_rumpun_jabatan.kode"),index=True, nullable=False, comment="dari kolom kode tabel ref_rumpun_jabatan")
    pembina_id = Column(String(50), index=True, nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship
    ref_jns_jabatan_rel = relationship("JenisJabatan", back_populates="ref_kel_jabatan")
    ref_rumpun_jabatan_rel = relationship("RumpunJabatan", back_populates="ref_kel_jabatan")
    ref_jabatan_fungsional = relationship("RefJabatanFungsional", back_populates="ref_kel_jabatan_rel")


class RefHukdis(Base):
    __tablename__ = "ref_hukdis"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(50), index=True, nullable=False, unique=True)
    nama = Column(String(100), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
class RefRiwayat(Base):
    __tablename__ = "ref_riwayat"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(50), index=True, nullable=False, unique=True)
    nama = Column(String(100), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class RefPenugasan(Base):
    __tablename__ = "ref_jns_penugasan"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(CHAR(5), index=True, nullable=False, unique=True)
    nama = Column(String(50), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    create_at = Column(DateTime(timezone=True), server_default=func.now())

class RefJabatanFungsional(Base):
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
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class RefJabatanFungsionalUmum(Base):
    __tablename__ = "ref_jabatan_fungsional_umum"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(50), unique=True, nullable=False)
    nama = Column(String(150), nullable=False)
    kode_cepat = Column(String(10),nullable=False)
    status = Column(Boolean, default=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class RefJenjangJabatan(Base): #Fungsional tertentu dan Struktural
    __tablename__ = "ref_jenjang_jabatan_struktural"
    id = Column(String(50), primary_key=True, index=True)
    kode = Column(String(2), index=True, nullable=False)
    nama = Column(String(100), nullable=False)
    ref_jns_pegawai_id = Column(String(50), ForeignKey("ref_jns_pegawai.kode"), index=True)
    created_bu = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class RefJabatanStruktural(Base):
    __tablename__ = "ref_jabatan_struktural"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(50), unique=True, nullable=False)
    nama = Column(String(150), nullable=False)
    kode_cepat = Column(String(10),nullable=False)
    status = Column(Boolean, default=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class RefGolongan(Base):
    __tablename__ = "ref_golongan"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(CHAR(3), index=True, nullable=False) 
    nama = Column(CHAR(5), nullable=False)
    nama_pangkat = Column(String(25), nullable=False)
    gol_pppk = Column(CHAR(5), nullable=True)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class RefDokumen(Base):
    __tablename__ = "ref_dokumen"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(CHAR(10), nullable=False)
    layanan_nama = Column(String(50), nullable=False)
    document = Column(String(50), nullable=False)
    file_type = Column(CHAR(5), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class JenisInstansi(Base):
    __tablename__ = "jenis_instansi"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(2), index=True, nullable=False, unique=True)
    nama = Column(String(35), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    ref_instansi_rel = relationship("Instansi", primaryjoin="JenisInstansi.kode == Instansi.jenis",back_populates="jenis_instansi_rel", cascade="all, delete-orphan")

class JenisInstansiId(Base):
    __tablename__ = "jenis_instansi_id"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(8), index=True, nullable=False, unique=True)
    nama = Column(String(50), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    ref_instansi_rel = relationship("Instansi", primaryjoin="JenisInstansiId.kode == Instansi.jenis_instansi_id", back_populates="jenis_instansi_id_rel", cascade="all, delete-orphan")

class Instansi(Base):
    __tablename__ = "ref_instansi"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(50), index=True, nullable=False, unique=True)
    kode_cepat = Column(CHAR(5), index=True, nullable=True)
    nama = Column(String(150), nullable=False)
    jenis = Column(String(2), ForeignKey("jenis_instansi.kode", ondelete="CASCADE"), index=True, nullable=False)
    jenis_instansi_id = Column(String(8), ForeignKey("jenis_instansi_id.kode", ondelete="CASCADE"), index=True, nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    jenis_instansi_rel = relationship("JenisInstansi", primaryjoin="Instansi.jenis == JenisInstansi.kode", back_populates="ref_instansi_rel")
    jenis_instansi_id_rel = relationship("JenisInstansiId", primaryjoin="Instansi.jenis_instansi_id == JenisInstansiId.kode", back_populates="ref_instansi_rel")
    ref_satker_rel = relationship("Satker", primaryjoin="Instansi.kode == Satker.instansi_id",back_populates="ref_instansi_rel", cascade="all, delete-orphan")

class Satker(Base):
    __tablename__ = "satker"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4())) 
    kode = Column(String(50), index=True, nullable=False)
    nama = Column(String(250), nullable=False)
    instansi_id = Column(String(50), ForeignKey("ref_instansi.kode", ondelete="CASCADE"), index=True, nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    ref_instansi_rel = relationship("Instansi", primaryjoin="Satker.instansi_id == Instansi.kode",back_populates="ref_satker_rel")

class RefKPPN(Base):
    __tablename__ = "ref_kppn"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(50), index=True, nullable=False, unique=True)
    nama = Column(String(100), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class RumpunPendidikan(Base):
    __tablename__ = "ref_rumpun_pendidikan"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(3), index=True, nullable=False)
    nama = Column(String(150), nullable=False)
    kode_cepat = Column(String(3), index=True, nullable=True)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class RefTKPendidikan (Base):
    __tablename__ = "ref_tk_pendidikan"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(50), unique=True, nullable=False)
    nama = Column(String(50), nullable=False)
    group_tk_pend_nm = Column(String(50), nullable=False)
    keterangan = Column(Text, nullable=True, default="-")
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    ref_pendidikan_rel = relationship("RefPendidikan", back_populates="ref_tk_pendidikan_rel")

class RefPendidikan (Base):
    __tablename__ = "ref_pendidikan"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(50), unique=True, nullable=False)
    ref_tk_pendidikan_id = Column(String(50), ForeignKey("ref_tk_pendidikan.kode"), index=True, nullable=False, comment="dari kolom kode tabel ref_tk_pendidikan")
    nama = Column(String(150), nullable=False)
    status = Column(Boolean, default=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    #relationship
    ref_tk_pendidikan_rel = relationship("RefTKPendidikan", back_populates="ref_pendidikan_rel")

class RefJnsLokasi(Base):
    __tablename__ = "ref_jns_lokasi"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(50), index=True, nullable=False, unique=True)
    nama = Column(String(100), nullable=False)
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    ref_lokasi_rel = relationship("RefLokasi", back_populates="ref_jns_lokasi_rel", cascade="all, delete-orphan")

class RefLokasi(Base):
    __tablename__ = "ref_lokasi"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    kode = Column(String(50), index=True, nullable=False, unique=True)
    nama = Column(String(100), nullable=False)
    kanreg_id = Column(String(100), nullable=False)
    ref_lokasi_id = Column(String(100), index=True, comment="id dari kolom ini sendiri (Children-parents)")
    kode_cepat = Column(CHAR(5), index=True, nullable=True)
    ref_jns_lokasi_id = Column(String(50), ForeignKey("ref_jns_lokasi.kode", ondelete="CASCADE"), index=True, nullable=False, comment="dari kolom kode tabel ref_jns_lokasi")
    created_by = Column(String(50), index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    ref_jns_lokasi_rel = relationship("RefJnsLokasi", back_populates="ref_lokasi_rel")



    


   
