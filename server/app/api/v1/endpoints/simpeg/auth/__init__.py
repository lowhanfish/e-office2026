from fastapi import APIRouter
from . import auth_group, auth_menu_access, auth_menu, auth_user_group


auth_router = APIRouter()

auth_router.include_router(auth_menu.router, prefix="/auth_menu")
auth_router.include_router(auth_group.router, prefix="/auth_group")