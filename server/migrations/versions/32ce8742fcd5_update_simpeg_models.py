"""update simpeg models

Revision ID: 32ce8742fcd5
Revises: 22f286af866e
Create Date: 2026-09-18 14:27:36.845793

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '32ce8742fcd5'
down_revision: Union[str, Sequence[str], None] = '22f286af866e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Rename and update the jenjang jabatan table without dropping its data."""
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    table_names = set(inspector.get_table_names())
    if "ref_jenjang_jabatan_struktural" in table_names:
        op.rename_table(
            "ref_jenjang_jabatan_struktural",
            "ref_jenjang_jabatan",
        )

    # MySQL may rename an automatically named foreign key together with its
    # table, so discover its actual name instead of assuming one.
    inspector = sa.inspect(bind)
    column_names = {
        column["name"] for column in inspector.get_columns("ref_jenjang_jabatan")
    }
    if "ref_jns_pegawai_id" in column_names:
        for foreign_key in inspector.get_foreign_keys("ref_jenjang_jabatan"):
            if foreign_key["constrained_columns"] == ["ref_jns_pegawai_id"]:
                op.drop_constraint(
                    foreign_key["name"],
                    "ref_jenjang_jabatan",
                    type_="foreignkey",
                )

        inspector = sa.inspect(bind)
        index_names = {
            index["name"] for index in inspector.get_indexes("ref_jenjang_jabatan")
        }
        for index_name in (
            "ix_ref_jenjang_jabatan_struktural_created_bu",
            "ix_ref_jenjang_jabatan_struktural_id",
            "ix_ref_jenjang_jabatan_struktural_kode",
            "ix_ref_jenjang_jabatan_struktural_ref_jns_pegawai_id",
        ):
            if index_name in index_names:
                op.drop_index(index_name, table_name="ref_jenjang_jabatan")
        op.drop_column("ref_jenjang_jabatan", "ref_jns_pegawai_id")

    inspector = sa.inspect(bind)
    column_names = {
        column["name"] for column in inspector.get_columns("ref_jenjang_jabatan")
    }
    if "created_bu" in column_names:
        op.alter_column(
            "ref_jenjang_jabatan",
            "created_bu",
            new_column_name="created_by",
            existing_type=sa.String(length=50),
            existing_nullable=False,
        )

    # Temporary defaults make this migration safe for databases that already
    # contain rows. Existing `kode` values become the initial `kode_cepat`.
    inspector = sa.inspect(bind)
    column_names = {
        column["name"] for column in inspector.get_columns("ref_jenjang_jabatan")
    }
    for column_name in (
        "kode_cepat",
        "asn_jenis_jabatan_id",
        "level_kompetensi_jabatan",
    ):
        if column_name not in column_names:
            op.add_column(
                "ref_jenjang_jabatan",
                sa.Column(
                    column_name,
                    sa.String(length=2),
                    nullable=False,
                    server_default="",
                ),
            )
    op.execute(
        sa.text(
            "UPDATE ref_jenjang_jabatan "
            "SET kode_cepat = kode WHERE kode_cepat = ''"
        )
    )
    for column_name in (
        "kode_cepat",
        "asn_jenis_jabatan_id",
        "level_kompetensi_jabatan",
    ):
        op.alter_column(
            "ref_jenjang_jabatan",
            column_name,
            existing_type=sa.String(length=2),
            existing_nullable=False,
            server_default=None,
        )

    inspector = sa.inspect(bind)
    unique_names = {
        constraint["name"]
        for constraint in inspector.get_unique_constraints("ref_jenjang_jabatan")
    }
    if "uq_ref_jenjang_jabatan_kode_cepat" not in unique_names:
        op.create_unique_constraint(
            "uq_ref_jenjang_jabatan_kode_cepat",
            "ref_jenjang_jabatan",
            ["kode_cepat"],
        )

    inspector = sa.inspect(bind)
    index_names = {
        index["name"] for index in inspector.get_indexes("ref_jenjang_jabatan")
    }
    for index_name, column_name in (
        ("ix_ref_jenjang_jabatan_created_by", "created_by"),
        ("ix_ref_jenjang_jabatan_id", "id"),
        ("ix_ref_jenjang_jabatan_kode", "kode"),
    ):
        if index_name not in index_names:
            op.create_index(
                op.f(index_name),
                "ref_jenjang_jabatan",
                [column_name],
                unique=False,
            )


def downgrade() -> None:
    """Restore the previous table name and columns."""
    op.drop_index(
        op.f("ix_ref_jenjang_jabatan_created_by"),
        table_name="ref_jenjang_jabatan",
    )
    op.drop_index(
        op.f("ix_ref_jenjang_jabatan_id"),
        table_name="ref_jenjang_jabatan",
    )
    op.drop_index(
        op.f("ix_ref_jenjang_jabatan_kode"),
        table_name="ref_jenjang_jabatan",
    )
    op.drop_constraint(
        "uq_ref_jenjang_jabatan_kode_cepat",
        "ref_jenjang_jabatan",
        type_="unique",
    )
    op.drop_column("ref_jenjang_jabatan", "level_kompetensi_jabatan")
    op.drop_column("ref_jenjang_jabatan", "asn_jenis_jabatan_id")
    op.drop_column("ref_jenjang_jabatan", "kode_cepat")
    op.alter_column(
        "ref_jenjang_jabatan",
        "created_by",
        new_column_name="created_bu",
        existing_type=sa.String(length=50),
        existing_nullable=False,
    )
    op.add_column(
        "ref_jenjang_jabatan",
        sa.Column("ref_jns_pegawai_id", sa.String(length=50), nullable=True),
    )
    op.rename_table(
        "ref_jenjang_jabatan",
        "ref_jenjang_jabatan_struktural",
    )
    op.create_index(
        "ix_ref_jenjang_jabatan_struktural_created_bu",
        "ref_jenjang_jabatan_struktural",
        ["created_bu"],
        unique=False,
    )
    op.create_index(
        "ix_ref_jenjang_jabatan_struktural_id",
        "ref_jenjang_jabatan_struktural",
        ["id"],
        unique=False,
    )
    op.create_index(
        "ix_ref_jenjang_jabatan_struktural_kode",
        "ref_jenjang_jabatan_struktural",
        ["kode"],
        unique=False,
    )
    op.create_index(
        "ix_ref_jenjang_jabatan_struktural_ref_jns_pegawai_id",
        "ref_jenjang_jabatan_struktural",
        ["ref_jns_pegawai_id"],
        unique=False,
    )
    op.create_foreign_key(
        "ref_jenjang_jabatan_struktural_ibfk_1",
        "ref_jenjang_jabatan_struktural",
        "ref_jns_pegawai",
        ["ref_jns_pegawai_id"],
        ["kode"],
    )
