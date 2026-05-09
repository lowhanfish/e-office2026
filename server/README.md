# e-Office Gateway (FastAPI)

Backend e-Office Konawe Selatan (BFF Gateway) menggunakan **FastAPI**.

## Stack

- FastAPI
- Uvicorn
- SQLAlchemy (async, MySQL via `aiomysql`)
- Alembic

## Prerequisites

- Python 3.10+ (disarankan)
- MySQL (sesuai konfigurasi di environment)

## Setup

1. Install dependencies

   ```bash
   pip install -r requirements.txt
   ```

2. Buat file environment variables (**.env**) di root project server.
   Contoh (sesuaikan):

   ```env
   DB_USER=...
   DB_PASSWORD=...
   DB_HOST=...
   DB_PORT=3306
   DB_NAME=...
   ```

3. Jalankan server
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

## API

- Root:
  - `GET /`

Versi API:

- Base: `/api/v1`

## Notes

- Endpoint SIMPEG master saat ini masih mengembalikan contoh data (placeholder).
- SQLAlchemy DB session tersedia melalui `app/db/session.py`.

---

## Dokumentasi: Generate Model & Migrasi (SQLAlchemy + Alembic)

### 1) Struktur model

Model ORM tersimpan di:

- `app/models/` (contoh: `app/models/simpeg_models.py`)

Base declarative yang digunakan:

- `app/db/session.py` → `Base`

### 2) Membuat/mengubah tabel (migrasi)

Setelah Anda menambah/ubah class model ORM, buat migration dengan Alembic.

Contoh alur:

```bash
# pastikan Anda berada di folder server
alembic revision --autogenerate -m "update simpeg models"
alembic upgrade head
```

### 3) Import model agar Alembic mendeteksi schema

Agar `--autogenerate` bisa membaca perubahan model, pastikan metadata model terdaftar di konfigurasi Alembic.

Secara umum, Anda perlu memastikan file yang menjadi entry Alembic memanggil import semua model ORM.

Di project ini, cek konfigurasi Alembic pada:

- `alembic.ini`
- folder `alembic/`

### 4) Referensi tabel/model

Dalam `app/models/simpeg_models.py`, definisi model mengacu ke `Base` dari `app/db/session.py`.

### 5) Checklist

- [ ] Perbarui class ORM di `app/models/*`
- [ ] Pastikan Alembic bisa melihat `Base.metadata` (dengan import model di `migrations/env.py`)
- [ ] Buat migration: `alembic revision --autogenerate ...`
- [ ] Terapkan migration: `alembic upgrade head`

---

## Cara menambah **model baru** / **tabel baru** (yang akan terbaca Alembic)

1. **Buat model baru**

- Tambahkan class ORM ke `app/models/` (mis. `app/models/simpeg_models.py`).
- Pastikan class tersebut mewarisi `Base` dari `app/db/session.py`.

2. **Pastikan model ter-import saat Alembic jalan**

- Buka `migrations/env.py`.
- Saat ini, `env.py` sudah meng-import `from app.models import simpeg_models`.
- Jika model Anda ditaruh di file model lain (mis. `app/models/pegawai_models.py`), maka tambahkan import file tersebut di `migrations/env.py`.

3. **Generate migration**

```bash
# pastikan DB_NAME sudah benar di .env
alembic revision --autogenerate -m "add <nama_model>"
```

4. **Apply migration**

```bash
alembic upgrade head
```

## Cara menambah **database baru**

1. Pastikan `.env` berisi koneksi untuk database baru.
2. Gunakan variabel `DB_NAME_SIMPEG` (kalau tidak ada, Alembic akan fallback ke `DB_NAME`).
3. Jika perlu aturan berbeda untuk memilih `target_metadata` atau URL koneksi, silakan sesuaikan `migrations/env.py`.

### Jika di masa depan Anda ingin mengubah isi dari Jenjang (misal menambah opsi baru), MySQL memerlukan perintah ALTER TABLE khusus untuk tipe data Enum. Alembic kadang tidak mendeteksinya secara otomatis. Jika itu terjadi, Anda bisa menambahkan perintah ini secara manual di file migrasinya:

```bash
# Contoh di dalam file migrations/versions/xxxx.py
op.execute("ALTER TABLE jns_jabatan_fungsional MODIFY COLUMN jenjang ENUM('PM', 'TR', 'MH', 'PY', 'PT', 'MU', 'MA', 'UT', 'BARU')")
```
