"""update simpeg models

Revision ID: fe2dc56d342c
Revises: 8a71d43e2f90
Create Date: 2026-09-07 09:53:39.157087

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fe2dc56d342c'
down_revision: Union[str, Sequence[str], None] = '8a71d43e2f90'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # `ref_instansi.kode` is referenced by `satker.instansi_id`, therefore the
    # existing index cannot be replaced until that foreign key is detached.
    op.drop_constraint('satker_ibfk_1', 'satker', type_='foreignkey')
    op.drop_index(op.f('ix_ref_instansi_kode'), table_name='ref_instansi')
    op.create_index(op.f('ix_ref_instansi_kode'), 'ref_instansi', ['kode'], unique=True)
    op.create_foreign_key(
        'fk_satker_instansi_id',
        'satker',
        'ref_instansi',
        ['instansi_id'],
        ['kode'],
        ondelete='CASCADE',
    )
    op.create_index(op.f('ix_ref_instansi_jenis'), 'ref_instansi', ['jenis'], unique=False)
    op.create_index(op.f('ix_ref_instansi_jenis_instansi_id'), 'ref_instansi', ['jenis_instansi_id'], unique=False)
    op.create_foreign_key(
        'fk_ref_instansi_jenis_instansi_id',
        'ref_instansi',
        'jenis_instansi_id',
        ['jenis_instansi_id'],
        ['kode'],
        ondelete='CASCADE',
    )
    op.create_foreign_key(
        'fk_ref_instansi_jenis',
        'ref_instansi',
        'jenis_instansi',
        ['jenis'],
        ['kode'],
        ondelete='CASCADE',
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint('fk_ref_instansi_jenis', 'ref_instansi', type_='foreignkey')
    op.drop_constraint('fk_ref_instansi_jenis_instansi_id', 'ref_instansi', type_='foreignkey')
    op.drop_index(op.f('ix_ref_instansi_jenis_instansi_id'), table_name='ref_instansi')
    op.drop_index(op.f('ix_ref_instansi_jenis'), table_name='ref_instansi')
    op.drop_constraint('fk_satker_instansi_id', 'satker', type_='foreignkey')
    op.drop_index(op.f('ix_ref_instansi_kode'), table_name='ref_instansi')
    op.create_index(op.f('ix_ref_instansi_kode'), 'ref_instansi', ['kode'], unique=False)
    op.create_foreign_key(
        'satker_ibfk_1',
        'satker',
        'ref_instansi',
        ['instansi_id'],
        ['kode'],
        ondelete='CASCADE',
    )
