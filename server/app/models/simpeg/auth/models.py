from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid

from app.db.session import Base

class AuthMenu(Base):
    __tablename__ = "auth_menu"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    title = Column(String(50), nullable=False)
    path = Column(String(100), nullable=False)
    icon = Column(String(30), nullable=True)
    color_icon = Column(String(30), nullable=True)
    color_text = Column(String(30), nullable=True)
    parent_id = Column(String(50), ForeignKey("auth_menu.id", ondelete="CASCADE"),index=True, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    created_by = Column(String(50), index=True, nullable=False)

    rel_auth_menu_access = relationship("AuthAccess", back_populates="rel_auth_menu", cascade="all, delete-orphan")
    parent = relationship("AuthMenu", remote_side= [id],back_populates="children")
    children = relationship("AuthMenu", back_populates="parent", passive_deletes=True)

class AuthGroup(Base):
    __tablename__ = "auth_group"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    nama = Column(String(50), nullable=False)
    keterangan = Column(Text, nullable=True, default="-")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    created_by = Column(String(50), index=True, nullable=False)

    rel_auth_menu_access = relationship("AuthAccess", back_populates="rel_auth_group", cascade="all, delete-orphan")
    rel_auth_user_group = relationship("AuthUserGroup", back_populates="rel_auth_group", cascade="all, delete-orphan")


class AuthAccess(Base):
    __tablename__ = "auth_menu_access"
    __table_args__ = (
        UniqueConstraint(
            "auth_group_id",
            "auth_menu_id",
            name="uq_group_menu"
        ),
    )
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    auth_menu_id = Column(String(50), ForeignKey("auth_menu.id", ondelete="CASCADE"), index=True, nullable=False, comment="di ambil dari id pada tabel auth_menu")
    auth_group_id = Column(String(50), ForeignKey("auth_group.id", ondelete="CASCADE"), index=True, nullable=False, comment="di ambil dari id pada tabel auth_group")
    createx = Column(Boolean, default=False)
    readx = Column(Boolean, default=False)
    updatex = Column(Boolean, default=False)
    deletex = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    created_by = Column(String(50), index=True, nullable=False)

    rel_auth_menu = relationship("AuthMenu", back_populates="rel_auth_menu_access" )
    rel_auth_group = relationship("AuthGroup", back_populates="rel_auth_menu_access")


class AuthUserGroup (Base):
    __tablename__ = "auth_user_group"
    id = Column(String(50), primary_key=True, index=True, default=lambda:str(uuid.uuid4()))
    user_id = Column(String(50), index=True, nullable=False, unique=True, comment="id user dari db users")
    auth_group_id = Column(String(50), ForeignKey("auth_group.id", ondelete="CASCADE"), index=True, nullable=False, comment="di ambil dari id pada tabel auth_group")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    created_by = Column(String(50), index=True, nullable=False)

    rel_auth_group = relationship("AuthGroup", back_populates="rel_auth_user_group")