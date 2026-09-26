"""update simpeg models

Revision ID: 8939bc2eaa56
Revises: 03276d429203
Create Date: 2026-09-26 13:20:58.793645

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '8939bc2eaa56'
down_revision: Union[str, Sequence[str], None] = '03276d429203'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # MySQL auto-commits DDL. If a previous attempt fails after CREATE TABLE,
    # Alembic's version stays at the old revision while the table remains.
    # Inspect first so this migration can safely resume from that state.
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    table_name = 'ref_jns_jabatan_umum'

    if not inspector.has_table(table_name):
        op.create_table(
            table_name,
            sa.Column('id', sa.String(length=50), nullable=False),
            sa.Column('kode', sa.String(length=2), nullable=False),
            sa.Column('nama', sa.String(length=100), nullable=False),
            sa.Column('created_by', sa.String(length=50), nullable=False),
            sa.Column(
                'created_at',
                sa.DateTime(timezone=True),
                server_default=sa.text('now()'),
                nullable=True,
            ),
            sa.PrimaryKeyConstraint('id'),
        )
        existing_indexes: set[str] = set()
    else:
        existing_indexes = {
            index['name'] for index in inspector.get_indexes(table_name)
        }

    indexes = (
        ('ix_ref_jns_jabatan_umum_created_by', ['created_by'], False),
        ('ix_ref_jns_jabatan_umum_id', ['id'], False),
        ('ix_ref_jns_jabatan_umum_kode', ['kode'], True),
    )
    for index_name, columns, unique in indexes:
        if index_name not in existing_indexes:
            op.create_index(index_name, table_name, columns, unique=unique)

    # The column cannot be altered while it is used by a MySQL foreign key.
    # Drop the old constraint first, then change the type and recreate it.
    kel_jabatan_fks = sa.inspect(bind).get_foreign_keys('ref_kel_jabatan')
    for foreign_key in kel_jabatan_fks:
        if foreign_key['constrained_columns'] == ['ref_jns_jabatan_id']:
            op.drop_constraint(
                foreign_key['name'], 'ref_kel_jabatan', type_='foreignkey'
            )

    op.alter_column(
        'ref_kel_jabatan',
        'ref_jns_jabatan_id',
        existing_type=mysql.VARCHAR(length=50),
        type_=sa.String(length=2),
        comment='dari kolom kode tabel ref_jns_jabatan_umum',
        existing_comment='dari kolom kode tabel ref_jns_jabatan',
        existing_nullable=False,
    )
    op.create_foreign_key(
        'fk_ref_kel_jabatan_ref_jns_jabatan_umum',
        'ref_kel_jabatan',
        'ref_jns_jabatan_umum',
        ['ref_jns_jabatan_id'],
        ['kode'],
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint(
        'fk_ref_kel_jabatan_ref_jns_jabatan_umum',
        'ref_kel_jabatan',
        type_='foreignkey',
    )
    op.alter_column(
        'ref_kel_jabatan',
        'ref_jns_jabatan_id',
        existing_type=sa.String(length=2),
        type_=mysql.VARCHAR(length=50),
        comment='dari kolom kode tabel ref_jns_jabatan',
        existing_comment='dari kolom kode tabel ref_jns_jabatan_umum',
        existing_nullable=False,
    )
    op.create_foreign_key(
        op.f('ref_kel_jabatan_ibfk_1'),
        'ref_kel_jabatan',
        'ref_jns_jabatan',
        ['ref_jns_jabatan_id'],
        ['kode'],
    )
    op.drop_index(op.f('ix_ref_jns_jabatan_umum_kode'), table_name='ref_jns_jabatan_umum')
    op.drop_index(op.f('ix_ref_jns_jabatan_umum_id'), table_name='ref_jns_jabatan_umum')
    op.drop_index(op.f('ix_ref_jns_jabatan_umum_created_by'), table_name='ref_jns_jabatan_umum')
    op.drop_table('ref_jns_jabatan_umum')
