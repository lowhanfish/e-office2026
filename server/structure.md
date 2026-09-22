# Backend e-Office (FastAPI) - Struktur Aplikasi

Backend menggunakan pendekatan modular per resource. Setiap resource menyimpan
endpoint, schema, dan placeholder service dalam satu package.

## Struktur Utama

```text
app/
├── main.py
├── api/
│   ├── deps.py
│   └── v1/
│       ├── api.py
│       └── endpoints/
│           ├── auth/
│           │   ├── __init__.py
│           │   ├── auth.py
│           │   ├── schema.py
│           │   └── service.py
│           └── simpeg/
│               ├── __init__.py
│               ├── auth/
│               ├── master/
│               │   ├── __init__.py
│               │   ├── agama/
│               │   │   ├── __init__.py
│               │   │   ├── agama.py
│               │   │   ├── schema.py
│               │   │   └── service.py
│               │   └── <resource_lain>/
│               │       ├── __init__.py
│               │       ├── <resource_lain>.py
│               │       ├── schema.py
│               │       └── service.py
│               └── riwayat/
├── core/
├── db/
├── models/
├── schemas/
│   └── simpeg/
│       └── master/
│           └── base_schema.py
└── services/
    ├── __init__.py
    └── crud_service.py
```

## Konvensi Resource

Contoh package `agama`:

- `agama.py`: router FastAPI dan implementasi CRUD saat ini;
- `schema.py`: schema request dan response Pydantic;
- `service.py`: sengaja dikosongkan untuk pemisahan business logic berikutnya;
- `__init__.py`: mengekspor objek `router` ke router induk.

Schema yang dipakai bersama oleh banyak resource tetap berada di `app/schemas/`.
Contohnya, seluruh schema master SIMPEG dapat mewarisi class dari
`app/schemas/simpeg/master/base_schema.py`.

Service yang benar-benar reusable lintas-resource berada di `app/services/`.
Service khusus satu resource nantinya ditempatkan pada `service.py` di package
resource masing-masing.

Nama service dan schema menggunakan `service.py` serta `schema.py`, bukan
`agama.service.py` atau `agama.schema.py`, karena tanda titik pada nama modul
memiliki arti khusus dalam sistem import Python.

## Routing

Router disusun secara bertingkat:

```text
app.main
└── app.api.v1.api
    ├── auth
    └── simpeg
        ├── auth
        ├── master
        └── riwayat
```

Package setiap resource mengekspor `router`, sehingga router induk tetap dapat
menggunakan pola berikut:

```python
from . import agama

master_router.include_router(agama.router, prefix="/agama")
```

## Database dan Model

Model SQLAlchemy tetap dipisahkan berdasarkan database di `app/models/`.
Konfigurasi session dan `Base` masing-masing database berada di `app/db/`.
Pemindahan endpoint dan schema tidak mengubah model, implementasi CRUD, URL API,
atau riwayat migrasi Alembic.
