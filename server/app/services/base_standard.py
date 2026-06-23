from typing import TypeVar, Type, Generic, List, Optional, Any, Dict
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.session import Base

# ModelType sekarang valid karena Base sudah berbentuk Class
ModelType = TypeVar("ModelType", bound=Base)

class CRUDBase(Generic[ModelType]):
    def __init__(self, model: Type[ModelType]):
        """
        Object CRUD default.
        model: Class model SQLAlchemy (contoh: Agama)
        """
        self.model = model

    # --- TAMPILKAN DATA (GET) ---
    async def get_multi(self, db: AsyncSession, skip: int = 0, limit: int = 100) -> List[ModelType]:
        query = select(self.model).offset(skip).limit(limit)
        result = await db.execute(query)
        return list(result.scalars().all())

    # --- TAMBAH DATA (POST) ---
    async def create(self, db: AsyncSession, *, obj_in: Dict[str, Any]) -> ModelType:
        db_obj = self.model(**obj_in)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    # --- EDIT DATA (POST - ORM Style) ---
    async def update(self, db: AsyncSession, *, id: Any, obj_in: Dict[str, Any]) -> Optional[ModelType]:
        # 1. Cari datanya dulu
        query = select(self.model).filter(self.model.id == id)
        result = await db.execute(query)
        db_obj = result.scalar_one_or_none()
        
        # 2. Jika ada, update hanya kolom yang dikirim
        if db_obj:
            for field, value in obj_in.items():
                if hasattr(db_obj, field):
                    setattr(db_obj, field, value)
            
            await db.commit()
            await db.refresh(db_obj)
        return db_obj

    # --- HAPUS DATA (POST) ---
    async def remove(self, db: AsyncSession, *, id: Any) -> bool:
        query = select(self.model).filter(self.model.id == id)
        result = await db.execute(query)
        db_obj = result.scalar_one_or_none()
        
        if db_obj:
            await db.delete(db_obj)
            await db.commit()
            return True
        return False