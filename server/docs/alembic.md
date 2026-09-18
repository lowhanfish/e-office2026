# Panduan migrasi database dengan Alembic

Proyek ini mempunyai riwayat migrasi terpisah untuk SIMPEG, Office, dan E-Gov.
Selalu jalankan perintah dari direktori `server` dan gunakan file konfigurasi
yang sesuai.

| Database | Konfigurasi | Direktori revisi |
|---|---|---|
| SIMPEG | `alembic.ini` | `migrations/versions/` |
| Office | `alembic_office.ini` | `migrations_office/versions/` |
| E-Gov | `alembic_egov.ini` | `migrations_egov/versions/` |

## Alur setelah mengubah model

Contoh berikut memakai database SIMPEG. Jika virtual environment belum aktif,
ganti `alembic` dengan `./venv/bin/alembic`.

```bash
# 1. Pastikan database telah memakai revisi terakhir yang tersedia
alembic current
alembic heads
alembic upgrade head

# 2. Buat revisi dari perubahan model
alembic revision --autogenerate -m "jelaskan perubahan model"

# 3. Baca dan koreksi file baru di migrations/versions/

# 4. Terapkan revisi dan verifikasi hasilnya
alembic upgrade head
alembic current
alembic check
```

`alembic check` harus menghasilkan `No new upgrade operations detected.` Jika
masih mendeteksi operasi baru, model dan skema database belum sama.

Untuk Office atau E-Gov, tambahkan parameter konfigurasi pada setiap perintah:

```bash
alembic -c alembic_office.ini ...
alembic -c alembic_egov.ini ...
```

## Error: Target database is not up to date

Error ini berarti revisi yang tercatat di database belum mencapai `head` yang
ada di direktori migrasi. Jangan membuat revisi baru sebelum masalah ini
selesai.

```bash
alembic current
alembic heads
alembic history
alembic upgrade head
```

Setelah `current` dan `heads` sama, ulangi `revision --autogenerate`.

### Jika `alembic_version` kosong

Periksa dahulu apakah tabel-tabel dari migrasi lama benar-benar sudah ada.
Apabila skemanya memang sudah diterapkan tetapi catatan versinya saja hilang,
versi dapat diselaraskan dengan:

```bash
alembic stamp head
```

`stamp` tidak membuat atau mengubah tabel; perintah ini hanya mengubah catatan
versi. Jangan menjalankannya pada database yang belum memiliki struktur dari
migrasi lama karena Alembic kemudian akan menganggap struktur tersebut sudah
ada.

Pada perbaikan 18 September 2026, runner async juga diubah agar memakai
transaksi eksplisit. Tujuannya supaya perubahan pada tabel `alembic_version`
di-commit dan tidak hilang ketika koneksi MySQL ditutup.

## Perubahan nama tabel atau kolom

Autogenerate biasanya tidak mengenali rename. Perubahan nama tabel dapat
ditulis sebagai `create_table` baru dan `drop_table` lama, yang berpotensi
menghapus data. Ubah hasilnya menjadi operasi eksplisit seperti:

```python
op.rename_table("nama_lama", "nama_baru")

op.alter_column(
    "nama_baru",
    "kolom_lama",
    new_column_name="kolom_baru",
    existing_type=sa.String(length=50),
    existing_nullable=False,
)
```

Periksa pula nama foreign key dan index setelah rename. MySQL dapat mengganti
nama constraint yang dibuat otomatis.

## Pemeriksaan sebelum diterapkan

SQL suatu revisi dapat dilihat tanpa mengubah database:

```bash
alembic upgrade <revisi_awal>:<revisi_tujuan> --sql
```

Sebelum `upgrade`, pastikan file migrasi:

- hanya menyentuh database dan tabel yang dimaksud;
- tidak melakukan `drop_table` akibat rename yang salah terdeteksi;
- mempunyai `downgrade()` yang masuk akal;
- menyediakan strategi backfill sebelum menambah kolom `NOT NULL` pada tabel
  yang sudah berisi data;
- tidak membuat unique constraint jika data lama masih mempunyai duplikat.

MySQL memakai DDL non-transaksional untuk migrasi ini. Jika satu langkah gagal,
langkah sebelumnya mungkin sudah tersimpan. Periksa struktur aktual dan buat
migrasi aman untuk kondisi parsial sebelum menjalankan ulang.

## Hasil migrasi SIMPEG terbaru

Revisi `32ce8742fcd5` melakukan perubahan berikut tanpa menghapus tabel lama:

- rename `ref_jenjang_jabatan_struktural` menjadi `ref_jenjang_jabatan`;
- rename `created_bu` menjadi `created_by`;
- menghapus `ref_jns_pegawai_id` beserta foreign key lama;
- menambahkan `kode_cepat`, `asn_jenis_jabatan_id`, dan
  `level_kompetensi_jabatan`;
- menambahkan unique constraint untuk `kode_cepat` dan index yang sesuai model.

Sesudah diterapkan, revisi aktif adalah `32ce8742fcd5 (head)` dan
`alembic check` tidak mendeteksi perubahan skema tambahan.
