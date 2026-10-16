"""Add foreign key for the UNOR parent relationship.

Revision ID: c8a42f01d963
Revises: be7525c7f514
"""

from alembic import op


revision = "c8a42f01d963"
down_revision = "be7525c7f514"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_foreign_key(
        "fk_ref_unor_parent_id", "ref_unor", "ref_unor", ["parent_id"], ["id"]
    )


def downgrade() -> None:
    op.drop_constraint("fk_ref_unor_parent_id", "ref_unor", type_="foreignkey")
