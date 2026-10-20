"""Allow kelompok jabatan without an instansi pembina reference."""

from alembic import op
import sqlalchemy as sa

revision = "7bc9a50e21f4"
down_revision = "616ead756e2d"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.alter_column(
        "ref_kel_jabatan", "pembina_id",
        existing_type=sa.String(50), existing_nullable=False, nullable=True,
    )


def downgrade() -> None:
    op.alter_column(
        "ref_kel_jabatan", "pembina_id",
        existing_type=sa.String(50), existing_nullable=True, nullable=False,
    )
