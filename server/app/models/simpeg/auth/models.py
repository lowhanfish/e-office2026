from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid

from app.db.session import Base

class AuthMenu(Base):
    __tablename__ = "auth_menu"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    nama = Column(String(50), nullable=False)
    route = Column(String(100), nullable=False)
    icon = Column(String(30), nullable=True)
    color_icon = Column(String(30), nullable=True)
    color_text = Column(String(30), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    created_by = Column(String(50), index=True, nullable=False)

class AuthGroup(Base):
    __tablename__ = "auth_group"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    nama = Column(String(50), nullable=False)
    keterangan = Column(Text, nullable=True, default="-")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    created_by = Column(String(50), index=True, nullable=False)

class AuthAccess(Base):
    __tablename__ = "auth_menu_access"
    user = Column(String(50), index=True, nullable=False, comment="id user dari db users")
    auth_menu_id = Column(String(50), ForeignKey("auth_menu.id"), index=True, nullable=False, comment="di ambil dari id pada tabel auth_menu")
    auth_group_id = Column(String(50), ForeignKey("auth_group.id"), index=True, nullable=False, comment="di ambil dari id pada tabel auth_group")
    createx = Column(Boolean, default=False)
    readx = Column(Boolean, default=False)
    updatex = Column(Boolean, default=False)
    deletex = Column(Boolean, default=False)


