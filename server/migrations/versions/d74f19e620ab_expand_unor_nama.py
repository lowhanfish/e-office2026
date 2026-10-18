"""Expand UNOR names to preserve full reference names.

Revision ID: d74f19e620ab
Revises: cc553b89e101
"""

from alembic import op
import sqlalchemy as sa


revision = "d74f19e620ab"
down_revision = "cc553b89e101"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.alter_column(
        "ref_unor", "nama",
        existing_type=sa.String(100), type_=sa.String(255),
        existing_nullable=False,
    )


def downgrade() -> None:
    connection = op.get_bind()
    if connection.execute(sa.text(
        "SELECT COUNT(*) FROM ref_unor WHERE CHAR_LENGTH(nama) > 100"
    )).scalar_one():
        raise RuntimeError("Cannot shorten ref_unor.nama: names exceed 100 characters")
    op.alter_column(
        "ref_unor", "nama",
        existing_type=sa.String(255), type_=sa.String(100),
        existing_nullable=False,
    )
