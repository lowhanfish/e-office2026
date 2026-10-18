import type { DocumentationContent } from './DocumentationSection'

export const componentDocumentation = {
    "InputData": {
        "badge": "BInput · BInputFile · BInputDate",
        "title": "Input untuk kebutuhan formulir",
        "description": "Contoh input angka, teks, lampiran, dan tanggal dengan nilai yang dikelola melalui state.",
        "hint": "Isi setiap field untuk melihat nilainya. Pemilihan lampiran pada contoh ini hanya membaca nama file, belum mengunggahnya.",
        "steps": [
            [
                "Tentukan jenis input",
                "Gunakan BInput untuk teks atau angka, BInputDate untuk tanggal, dan BInputFile untuk lampiran."
            ],
            [
                "Simpan nilainya",
                "Hubungkan value dengan state, lalu perbarui melalui callback komponen."
            ],
            [
                "Tangani lampiran",
                "onFileSelect mengembalikan File, FileList, atau null. Ubah FileList menjadi array jika memilih beberapa file."
            ]
        ],
        "props": [
            [
                "BInput: type / value",
                "Wajib",
                "Jenis input text atau number dan nilai yang ditampilkan."
            ],
            [
                "BInput: onChange",
                "Wajib",
                "Menerima nilai input. Konversikan dengan Number jika membutuhkan angka untuk perhitungan."
            ],
            [
                "BInputDate: value / onChange",
                "Wajib",
                "Nilai tanggal dan callback pembaruannya."
            ],
            [
                "BInputFile: onFileSelect",
                "Wajib",
                "Menangani file yang dipilih pengguna."
            ],
            [
                "accept / multiple",
                "Opsional",
                "Membatasi tipe file di pemilih dan mengizinkan pemilihan beberapa file."
            ],
            [
                "title / placeholder",
                "Sesuai komponen",
                "Label field dan petunjuk pengisian."
            ]
        ]
    },
    "BCheckBox": {
        "badge": "BCheckBox",
        "title": "Pilihan dengan checkbox",
        "description": "Gunakan checkbox untuk nilai ya atau tidak, persetujuan, atau pilihan yang dapat diaktifkan.",
        "hint": "Semua variasi pada demo ini memakai satu state bersama. Mengubah satu checkbox akan memperbarui seluruh variasi.",
        "steps": [
            [
                "Simpan status",
                "Siapkan state boolean untuk menentukan apakah checkbox dicentang."
            ],
            [
                "Hubungkan callback",
                "onChange menerima checked dan value. Gunakan checked untuk memperbarui state."
            ],
            [
                "Pilih variasi",
                "Sesuaikan size dan color. Untuk pilihan independen, gunakan state terpisah."
            ]
        ],
        "props": [
            [
                "checked",
                "Opsional",
                "Status checkbox dalam bentuk boolean."
            ],
            [
                "value",
                "Opsional",
                "Nilai yang diteruskan bersama status centang."
            ],
            [
                "onChange",
                "Wajib",
                "Callback dengan argumen checked dan value."
            ],
            [
                "title",
                "Opsional",
                "Teks pendamping checkbox."
            ],
            [
                "size / color",
                "Wajib",
                "Ukuran xs hingga xl dan variasi warna."
            ]
        ]
    },
    "BInputRadioButton": {
        "badge": "BRadioButton",
        "title": "Satu pilihan dalam satu kelompok",
        "description": "Gunakan radio button ketika pengguna hanya boleh memilih satu nilai dari beberapa opsi.",
        "hint": "Coba variasi ukuran dan warna. Contoh ini menggunakan satu state pilihan untuk seluruh demo.",
        "steps": [
            [
                "Kelompokkan opsi",
                "Gunakan name yang sama untuk opsi dalam satu kelompok."
            ],
            [
                "Bandingkan nilai",
                "Isi checked dengan hasil perbandingan state dan value opsi."
            ],
            [
                "Perbarui pilihan",
                "Simpan nilai dari onChange. Gunakan state terpisah untuk kelompok yang independen."
            ]
        ],
        "props": [
            [
                "name",
                "Opsional",
                "Nama kelompok radio button."
            ],
            [
                "value",
                "Wajib",
                "Nilai yang diwakili oleh opsi."
            ],
            [
                "checked",
                "Wajib",
                "Menentukan apakah opsi sedang dipilih."
            ],
            [
                "onChange",
                "Wajib",
                "Menerima nilai opsi yang dipilih."
            ],
            [
                "title / size / color",
                "Opsional",
                "Label, ukuran, dan warna opsi."
            ]
        ]
    },
    "InputDataACT": {
        "badge": "BInputAutocomplete",
        "title": "Autocomplete berdasarkan properti objek",
        "description": "Cari data dari array objek dengan menentukan properti teks dan properti nilai pilihan.",
        "hint": "Ketik nama dan pilih hasil pencarian. Gunakan tombol panah serta Enter untuk memilih dengan keyboard.",
        "steps": [
            [
                "Siapkan array",
                "Masukkan data ke DataObj. Properti yang digunakan sebagai label harus berisi teks."
            ],
            [
                "Tentukan properti",
                "Isi label dengan nama properti teks dan BKey dengan nama properti nilai."
            ],
            [
                "Terima hasil",
                "BSetValue menerima nilai pilihan, sedangkan BGetText menerima teks pencarian."
            ]
        ],
        "props": [
            [
                "DataObj",
                "Wajib",
                "Array objek yang menjadi sumber pilihan."
            ],
            [
                "label",
                "Wajib",
                "Nama properti teks untuk tampilan dan pencarian."
            ],
            [
                "BKey",
                "Wajib",
                "Nama properti yang nilainya dikirim saat memilih."
            ],
            [
                "BSetValue",
                "Wajib",
                "Setter untuk menyimpan nilai dari properti BKey."
            ],
            [
                "BGetText",
                "Wajib",
                "Setter untuk menerima teks pencarian."
            ],
            [
                "title / placeholder",
                "Wajib",
                "Label dan petunjuk input."
            ]
        ]
    },
    "ListDocuments": {
        "badge": "BlistDocument",
        "title": "Daftar dokumen yang ringkas",
        "description": "Tampilkan judul, keterangan, tanggal, dan ikon dokumen dalam kartu yang dapat diklik.",
        "hint": "Klik kartu untuk membuka contoh menu tindakan. Tombol Detail, Edit, dan Delete pada demo belum terhubung ke aksi data.",
        "steps": [
            [
                "Isi informasi",
                "Gunakan title, subtitle, dan stamp untuk informasi utama dokumen."
            ],
            [
                "Sesuaikan ikon",
                "Kirim elemen React melalui icon agar jenis dokumen mudah dikenali."
            ],
            [
                "Tangani klik",
                "Gunakan onClick untuk membuka detail, menu, atau halaman dokumen."
            ]
        ],
        "props": [
            [
                "title / subtitle",
                "Opsional",
                "Judul dan keterangan singkat dokumen."
            ],
            [
                "stamp",
                "Opsional",
                "Teks tanggal atau penanda dokumen."
            ],
            [
                "icon",
                "Opsional",
                "Elemen ikon yang ditampilkan pada kartu."
            ],
            [
                "onClick",
                "Opsional",
                "Aksi ketika kartu diklik."
            ]
        ]
    },
    "ListUser": {
        "badge": "BlistUser",
        "title": "Kartu profil pengguna",
        "description": "Tampilkan foto, nama, dan jabatan dalam susunan kartu yang mudah dipindai.",
        "hint": "Contoh menampilkan empat profil dalam grid responsif. Ikon sosial pada komponen masih menggunakan tautan placeholder.",
        "steps": [
            [
                "Siapkan profil",
                "Sediakan photo, name, dan title untuk setiap pengguna."
            ],
            [
                "Render daftar",
                "Gunakan map untuk menampilkan satu kartu per pengguna."
            ],
            [
                "Atur susunan",
                "Gunakan grid di halaman pemanggil untuk menyesuaikan jumlah kolom."
            ]
        ],
        "props": [
            [
                "photo",
                "Wajib",
                "Path atau URL gambar profil untuk Next Image."
            ],
            [
                "name",
                "Wajib",
                "Nama pengguna yang ditampilkan."
            ],
            [
                "title",
                "Wajib",
                "Jabatan atau keterangan profil."
            ]
        ]
    },
    "BTable": {
        "badge": "HTML table · BModal",
        "title": "Tabel data dengan menu tindakan",
        "description": "Contoh tabel menggunakan kelas Btable, data berbentuk array objek, dan menu tindakan di dalam modal.",
        "hint": "Klik ikon pengaturan pada salah satu baris untuk membuka menu. Tombol tindakan merupakan contoh tampilan.",
        "steps": [
            [
                "Susun kolom",
                "Tentukan header dan sel tabel sesuai informasi yang ingin ditampilkan."
            ],
            [
                "Render baris",
                "Gunakan map untuk mengubah array menjadi baris tabel dengan key yang stabil."
            ],
            [
                "Tambahkan tindakan",
                "Hubungkan tombol baris ke modal. Simpan identitas baris jika tindakan perlu mengolah data tertentu."
            ]
        ],
        "props": [
            [
                "Data",
                "Data contoh",
                "Array lokal yang dirender menjadi baris; bukan prop komponen tabel."
            ],
            [
                "className=\"Btable\"",
                "Gaya tabel",
                "Kelas CSS untuk tampilan tabel pada proyek ini."
            ],
            [
                "open / setOpen",
                "State demo",
                "Mengatur visibilitas modal menu tindakan."
            ],
            [
                "item.status",
                "Data baris",
                "Menentukan teks dan warna penanda status."
            ]
        ]
    },
    "ListButton": {
        "badge": "BButton",
        "title": "Tombol untuk berbagai tindakan",
        "description": "Pilih ukuran, warna, dan gaya tombol sesuai tingkat kepentingan tindakan di halaman.",
        "hint": "Bandingkan variasi tampilan. Klik tombol untuk menambah penghitung interaksi di bawah demo.",
        "steps": [
            [
                "Tentukan isi",
                "Kirim teks atau elemen React melalui children."
            ],
            [
                "Pilih tampilan",
                "Atur size, color, dan mode sesuai kebutuhan."
            ],
            [
                "Hubungkan aksi",
                "Gunakan onClick untuk tindakan, atau type submit untuk pengiriman formulir."
            ]
        ],
        "props": [
            [
                "children",
                "Wajib",
                "Konten tombol berupa elemen React."
            ],
            [
                "size",
                "Wajib",
                "Ukuran xs, sm, md, lg, atau xl."
            ],
            [
                "color",
                "Wajib",
                "Warna gray, blue, green, yellow, atau red."
            ],
            [
                "mode",
                "Opsional",
                "Gaya tambahan: 3d, glossy, neo, atau neon."
            ],
            [
                "onClick",
                "Opsional",
                "Callback ketika tombol diklik."
            ],
            [
                "type / disabled",
                "Opsional",
                "Jenis tombol HTML dan status nonaktif."
            ]
        ]
    },
    "ListPagination": {
        "badge": "BPagination",
        "title": "Navigasi halaman data",
        "description": "Bagi daftar panjang menjadi beberapa halaman dengan navigasi nomor, sebelumnya, dan berikutnya.",
        "hint": "Pilih nomor halaman untuk memperbarui halaman aktif. Contoh ini hanya menunjukkan navigasi; data belum dimuat dari API.",
        "steps": [
            [
                "Hitung total",
                "Isi dataLength dengan jumlah seluruh data dan pageLimit dengan jumlah data per halaman."
            ],
            [
                "Simpan halaman",
                "Hubungkan pageSelect dan setPageSelect ke state halaman aktif."
            ],
            [
                "Muat data",
                "Gunakan nomor halaman dari onClick untuk mengambil atau memotong data yang ditampilkan."
            ]
        ],
        "props": [
            [
                "pageSelect / setPageSelect",
                "Wajib",
                "State halaman aktif dan setter-nya, dimulai dari 1."
            ],
            [
                "pageLimit",
                "Wajib",
                "Jumlah data pada setiap halaman."
            ],
            [
                "pageShow",
                "Wajib",
                "Jumlah tombol nomor halaman dalam satu kelompok."
            ],
            [
                "dataLength",
                "Opsional",
                "Jumlah keseluruhan data untuk menghitung total halaman."
            ],
            [
                "onClick",
                "Opsional",
                "Menerima nomor halaman yang dipilih."
            ]
        ]
    },
    "ListChart": {
        "badge": "ChartBar · ChartVolume · ChartRadar",
        "title": "Visualisasi data dalam grafik",
        "description": "Gunakan grafik batang, donat, garis, dan radar untuk menyajikan perbandingan atau perubahan data.",
        "hint": "Arahkan kursor ke grafik untuk melihat detail. Data pada demo bersifat statis dan hanya digunakan sebagai ilustrasi.",
        "steps": [
            [
                "Siapkan label",
                "Buat array label untuk kategori atau waktu yang ditampilkan."
            ],
            [
                "Pasangkan nilai",
                "Pastikan urutan dan jumlah nilai sesuai dengan label."
            ],
            [
                "Pilih grafik",
                "Gunakan batang untuk perbandingan, garis untuk tren, dan donat untuk komposisi."
            ]
        ],
        "props": [
            [
                "ChartBar / ChartDougnut",
                "Komponen",
                "Menerima list, labels, dan item sebagai nama seri."
            ],
            [
                "ChartBarGroup",
                "Komponen",
                "Menerima labels; seri data pada implementasi saat ini masih ditentukan di dalam komponen."
            ],
            [
                "ChartVolume",
                "Komponen",
                "Menerima labels_volume dan datasets untuk grafik garis."
            ],
            [
                "ChartRadar",
                "Komponen",
                "Menerima labels dan datasets untuk perbandingan beberapa dimensi."
            ]
        ]
    },
    "ListModal": {
        "badge": "BModal",
        "title": "Dialog untuk informasi dan tindakan",
        "description": "Tampilkan konten tambahan dalam dialog yang dibuka melalui tindakan pengguna.",
        "hint": "Klik Buka dialog untuk mencoba modal. Tutup melalui ikon silang atau tombol Selesai.",
        "steps": [
            [
                "Siapkan state",
                "Gunakan boolean untuk menentukan apakah modal terbuka."
            ],
            [
                "Hubungkan pemicu",
                "Ubah state menjadi true dari tombol pembuka."
            ],
            [
                "Isi dialog",
                "Kirim konten melalui children dan gunakan setOpenModal untuk menutupnya."
            ]
        ],
        "props": [
            [
                "openModal",
                "Wajib",
                "Status terbuka atau tertutup."
            ],
            [
                "setOpenModal",
                "Wajib",
                "Setter state untuk mengubah visibilitas."
            ],
            [
                "children",
                "Wajib",
                "Konten yang ditampilkan di dalam dialog."
            ],
            [
                "title",
                "Opsional",
                "Judul pada header modal."
            ],
            [
                "size",
                "Opsional",
                "Ukuran xs, sm, md, lg, atau xl. Contoh ini menggunakan sm."
            ]
        ]
    }
} satisfies Record<string, DocumentationContent>
