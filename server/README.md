# e-Office Gateway (FastAPI)

Backend e-Office Konawe Selatan menggunakan FastAPI, SQLAlchemy async, MySQL,
dan Alembic. Backend ini mendukung beberapa database yang memiliki session,
model metadata, dan riwayat migrasi terpisah.

## Stack

- Python 3.10+
- FastAPI
- Uvicorn
- SQLAlchemy 2 async
- MySQL melalui `aiomysql`
- Pydantic 2
- Alembic
- JWT authentication

## Database

Backend menggunakan tiga database:

| Modul | Database | Environment | Session |
|---|---|---|---|
| SIMPEG | `simpeg_test` | `DB_NAME_SIMPEG` | `app/db/session_simpeg.py` |
| Office | `office` | `DB_NAME_OFFICE` | `app/db/session_office.py` |
| E-Gov | `egov` | `DB_NAME_EGOV` | `app/db/session_egov.py` |

Masing-masing database memiliki:

- SQLAlchemy async engine;
- connection pool;
- `AsyncSessionLocal`;
- dependency `get_db` untuk FastAPI;
- declarative `Base` dan `Base.metadata` tersendiri;
- konfigurasi serta riwayat Alembic tersendiri.

`app/db/factory.py` menyediakan factory koneksi agar konfigurasi engine dan
session tidak ditulis berulang. `app/db/alembic_runner.py` menyediakan logika
bersama untuk menjalankan Alembic secara online maupun offline.

## Setup

### 1. Buat virtual environment dan install dependency

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Atur environment

Buat `.env` di root folder `server`:

```env
DB_USER=...
DB_PASSWORD=...
DB_HOST=127.0.0.1
DB_PORT=3306

DB_NAME_SIMPEG=simpeg_test
DB_NAME_OFFICE=office
DB_NAME_EGOV=egov

JWT_SECRET_KEY=...
JWT_REFRESH_SECRET_KEY=...

# Opsional, default false
DB_ECHO=false
```

`DB_ECHO=true` dapat digunakan saat development untuk menampilkan query SQL.
Gunakan `false` di production agar query tidak memenuhi log aplikasi.

### 3. Jalankan server

Jika virtual environment aktif:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Atau langsung menggunakan executable dari virtual environment:

```bash
./venv/bin/uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API tersedia pada:

```text
Root API : http://localhost:8000/
API v1   : http://localhost:8000/api/v1
Swagger  : http://localhost:8000/docs
OpenAPI  : http://localhost:8000/openapi.json
```

## Struktur session

```text
app/db/
├── factory.py
├── alembic_runner.py
├── session.py
├── sessionq.py
├── session_simpeg.py
├── session_office.py
└── session_egov.py
```

`session.py` dipertahankan sebagai alias kompatibilitas untuk SIMPEG. Oleh
karena itu, endpoint SIMPEG lama yang menggunakan import berikut tetap bekerja:

```python
from app.db.session import get_db
```

Untuk kode baru, gunakan session yang eksplisit sesuai database:

```python
from app.db.session_simpeg import get_db as get_db_simpeg
from app.db.session_office import get_db as get_db_office
from app.db.session_egov import get_db as get_db_egov
```

Contoh dependency endpoint:

```python
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session_office import get_db


async def read_office_data(
    db: AsyncSession = Depends(get_db),
):
    ...
```

Jangan membuat engine atau session factory di dalam endpoint. Engine harus
dibuat satu kali saat modul session dimuat, sedangkan session dibuat untuk setiap
request dan dikembalikan ke connection pool setelah selesai.

## Struktur model

Model dikelompokkan berdasarkan database:

```text
app/models/
├── simpeg/
│   ├── auth/
│   ├── master/
│   └── test.py
├── office/
│   └── test.py
└── egov/
    └── test.py
```

Setiap model wajib menggunakan `Base` milik database tujuan.

### Model SIMPEG

```python
from app.db.session_simpeg import Base
```

### Model Office

```python
from app.db.session_office import Base
```

### Model E-Gov

```python
from app.db.session_egov import Base
```

Ketiga database mempunyai contoh model `Test` dengan kolom:

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | `VARCHAR(36)` | Primary key, UUID |
| `title` | `VARCHAR(255)` | Wajib diisi |
| `createdAt` | `DATETIME` | Default waktu saat data dibuat |

## Alembic multi-database

Konfigurasi dan folder migrasi dipisahkan agar migration history tidak
diterapkan ke database yang salah.

| Database | Config | Folder migration |
|---|---|---|
| SIMPEG | `alembic.ini` | `migrations/` |
| Office | `alembic_office.ini` | `migrations_office/` |
| E-Gov | `alembic_egov.ini` | `migrations_egov/` |

### Migrasi SIMPEG

Perintah lama tetap berlaku untuk SIMPEG:

```bash
alembic revision --autogenerate -m "update simpeg models"
alembic upgrade head
```

Jika virtual environment belum aktif:

```bash
./venv/bin/alembic revision --autogenerate -m "update simpeg models"
./venv/bin/alembic upgrade head
```

### Migrasi Office

```bash
alembic -c alembic_office.ini revision --autogenerate -m "update office models"
alembic -c alembic_office.ini upgrade head
```

Tanpa mengaktifkan virtual environment:

```bash
./venv/bin/alembic -c alembic_office.ini revision --autogenerate -m "update office models"
./venv/bin/alembic -c alembic_office.ini upgrade head
```

### Migrasi E-Gov

```bash
alembic -c alembic_egov.ini revision --autogenerate -m "update egov models"
alembic -c alembic_egov.ini upgrade head
```

Tanpa mengaktifkan virtual environment:

```bash
./venv/bin/alembic -c alembic_egov.ini revision --autogenerate -m "update egov models"
./venv/bin/alembic -c alembic_egov.ini upgrade head
```

## Menambahkan model SIMPEG baru

Misalnya akan menambahkan model `Pegawai`.

### 1. Buat model

Buat `app/models/simpeg/pegawai.py`:

```python
import uuid
from datetime import datetime

from sqlalchemy import DateTime, String
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.db.session_simpeg import Base


class Pegawai(Base):
    __tablename__ = "pegawai"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
    )
    nama: Mapped[str] = mapped_column(String(150), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
```

### 2. Daftarkan model

Tambahkan import ke `app/models/simpeg/__init__.py`:

```python
from .pegawai import Pegawai
```

Model harus di-import agar tabelnya masuk ke `Base.metadata` dan dapat dideteksi
oleh Alembic.

### 3. Generate migration

```bash
alembic revision --autogenerate -m "create pegawai table"
```

### 4. Periksa migration

Periksa file baru di `migrations/versions/`. Pastikan `upgrade()` dan
`downgrade()` hanya memuat perubahan yang memang diinginkan. Jangan langsung
menjalankan migration hasil autogenerate tanpa meninjaunya.

### 5. Terapkan migration

```bash
alembic upgrade head
```

## Perintah Alembic pendukung

Contoh berikut menggunakan SIMPEG. Tambahkan `-c alembic_office.ini` atau
`-c alembic_egov.ini` untuk database lainnya.

```bash
# Melihat revision yang sedang aktif di database
alembic current

# Melihat head terbaru
alembic heads

# Melihat riwayat migration
alembic history

# Menghasilkan SQL tanpa menerapkannya ke database
alembic upgrade head --sql

# Membatalkan satu revision terakhir
alembic downgrade -1
```

## Checklist perubahan model

- [ ] Gunakan `Base` dari session database yang benar.
- [ ] Import model melalui `app/models/<database>/__init__.py`.
- [ ] Jalankan `revision --autogenerate` dengan config database yang benar.
- [ ] Periksa isi file migration sebelum menjalankannya.
- [ ] Pastikan migration tidak berisi perubahan dari database lain.
- [ ] Jalankan `upgrade head` menggunakan config yang sama.
- [ ] Simpan file migration ke version control.

## Catatan MySQL Enum

Perubahan nilai Enum pada MySQL kadang tidak terdeteksi sempurna oleh
`--autogenerate`. Jika diperlukan, perubahan dapat ditulis manual di migration:

```python
op.execute(
    "ALTER TABLE jns_jabatan_fungsional "
    "MODIFY COLUMN jenjang "
    "ENUM('PM', 'TR', 'MH', 'PY', 'PT', 'MU', 'MA', 'UT', 'BARU')"
)
```

Selalu siapkan backup database dan periksa SQL migration sebelum menerapkan
perubahan struktur pada lingkungan production.
