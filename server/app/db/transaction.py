from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession


def _is_unique_violation(exc: IntegrityError) -> bool:
    """Recognize duplicate-key errors from supported database drivers."""
    original_error = exc.orig
    error_code = getattr(original_error, "sqlstate", None) or getattr(
        original_error, "pgcode", None
    )

    if error_code == "23505":  # PostgreSQL unique_violation
        return True

    error_args = getattr(original_error, "args", ())
    if error_args and error_args[0] == 1062:  # MySQL/MariaDB duplicate entry
        return True

    error_message = str(original_error).lower()
    return any(
        marker in error_message
        for marker in (
            "duplicate entry",
            "unique constraint failed",
            "violates unique constraint",
        )
    )


async def commit_or_raise_unique_conflict(
    db: AsyncSession,
    *,
    detail: str = "Data dengan nilai unik yang sama sudah tersedia",
) -> None:
    """Commit a transaction and return HTTP 409 for duplicate unique values."""
    try:
        await db.commit()
    except IntegrityError as exc:
        await db.rollback()

        if _is_unique_violation(exc):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=detail,
            ) from exc

        raise
