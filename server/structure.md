/backend-bff
├── app/
│ ├── **init**.py
│ ├── main.py # Entry point utama & inisialisasi FastAPI
│ │
│ ├── api/ # Layer Routing (Navigasi API)
│ │ ├── **init**.py
│ │ └── v1/
│ │ ├── **init**.py
│ │ ├── api.py # Root Router V1 (Menyatukan semua modul)
│ │ └── endpoints/
│ │ ├── **init**.py
│ │ ├── absensi.py
│ │ ├── e_office.py
│ │ └── simpeg/ # Modul SIMPEG (Sub-routing)
│ │ ├── **init**.py
│ │ ├── master/ # <--- Folder Khusus Master Data
│ │ │ ├── **init**.py
│ │ │ ├── agama.py
│ │ │ └── esselon.py
│ │ ├── pegawai.py # Transaksional
│ │ └── jabatan.py # Transaksional
│ │
│ ├── core/ # Pusat Konfigurasi & Keamanan
│ │ ├── config.py # Pembaca .env (URL Microservices, DB URL)
│ │ ├── security.py # Autentikasi JWT & Role-based Access
│ │ └── dependencies.py # Dependency Injection (DB session, Auth check)
│ │
│ ├── db/ # Layer Database (MySQL)
│ │ ├── base.py # Import semua model untuk Alembic
│ │ ├── session.py # Engine & Session Maker (SQLAlchemy)
│ │ └── base_class.py # Declarative Base untuk Model
│ │
│ ├── models/ # Layer Model Tabel (SQLAlchemy Entities)
│ │ ├── user.py
│ │ └── audit_log.py
│ │
│ ├── schemas/ # Layer Validasi & Data Shaping (Pydantic)
│ │ ├── simpeg_schema.py
│ │ └── master_schema.py
│ │
│ ├── services/ # Layer Gateway (Logic memanggil Microservices)
│ │ ├── base.py # HTTPX Async Client Wrapper
│ │ ├── simpeg_svc.py # Client untuk Microservice Node.js
│ │ └── absensi_svc.py # Client untuk Microservice Go/Python
│ │
│ ├── utils/ # Helper/Tools umum (Bukan Logic Bisnis)
│ │ └── helpers.py
│ │
│ └── middleware/ # Interceptor (Logging, Custom Headers)
│ └── logger.py
│
├── alembic/ # Migrasi Database (Versioning Tabel)
├── .env # Environment Variables (Credential)
├── alembic.ini # Config Migrasi
├── docker-compose.yml # Orchestration Container
└── requirements.txt # Daftar Library
