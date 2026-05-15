# Backend e-Office (FastAPI) - Struktur Folder

Dokumentasi struktur ini disesuaikan dengan struktur file yang benar-benar ada di repo `server` saat ini.

---

## Struktur Utama

```text
/backend-bff
├── app/
│   ├── main.py # Entry point utama & inisialisasi FastAPI
│   ├── api/
│   │   └── v1/
│   │       ├── api.py # Root Router V1 (Menyatukan semua modul)
│   │       └── endpoints/
│   │           └── simpeg/
│   │               ├── __init__.py
│   │               ├── master/
│   │               │   ├── __init__.py
│   │               │   ├── agama.py
│   │               │   ├── esselon.py
│   │               │   ├── ref_hukdis.py
│   │               │   ├── ref_jabfung.py
│   │               │   ├── ref_jabfung_umum.py
│   │               │   ├── ref_kel_jabatan.py
│   │               │   └── ref_riwayat.py
│   │               └── riwayat/
│   │                   ├── __init__.py
│   │                   └── pendidikan/
│   │                       ├── __init__.py
│   │                       ├── diklat.py
│   │                       ├── kursus.py
│   │                       └── pendidikan_formal.py
│   │
│   ├── db/
│   │   ├── session.py
│   │   └── sessionq.py
│   │
│   ├── models/
│   │   └── simpeg_models.py # Semua ORM model saat ini
│   │
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   └── middleware/
│
├── migrations/
│   ├── env.py # Alembic runtime config + target_metadata
│   ├── README
│   └── versions/
│       ├── *.py # File migrasi Alembic
│
├── README.md
└── requirements.txt
```

---

## Catatan Integrasi Penting (sesuai repo saat ini)

### 1) Routing

- Router utama didefinisikan di: `app/api/v1/api.py`
- Endpoint SIMPEG di-include dari: `app/api/v1/endpoints/simpeg/...`

### 2) Model ORM

- Semua model ORM saat ini berada di: `app/models/simpeg_models.py`

### 3) Alembic

- Konfigurasi Alembic ada di: `migrations/env.py`
- `target_metadata` diambil dari `Base.metadata`.
- `migrations/env.py` meng-import `app.models.simpeg_models` agar Alembic dapat mendeteksi metadata model untuk `--autogenerate`.

---

## Dokumentasi Lanjutan

Lihat juga:

- `README.md`
- `migrations/README`
