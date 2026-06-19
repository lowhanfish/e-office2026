'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { requestJSON } from '@/lib/api';
import { useCrudMutation } from '@/hooks/useCrudMutation';

// 1. Tipe Data untuk Kasus Kita
interface DataAlamat {
    id: number;
    nama: string;
    alamat: string;
    kontak: string;
}

// ============================================================================
// LAYER 1: API FUNCTIONS (MENGGUNAKAN requestJSON)
// ============================================================================

// Mengambil Semua Data Alamat
const fetchAlamatAPI = () =>
    requestJSON<DataAlamat[]>('/api/alamat');

// Mengubah Data Alamat Berdasarkan ID
const updateAlamatAPI = (payload: DataAlamat) =>
    requestJSON<DataAlamat>(`/api/alamat/${payload.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            nama: payload.nama,
            alamat: payload.alamat,
            kontak: payload.kontak,
        }),
    });


// ============================================================================
// LAYER 2: KOMPONEN UTAMA
// ============================================================================
export default function BukuAlamatPage() {
    // A. STATE FORM UNTUK KASUS (NAMA, ALAMAT, KONTAK)
    const [inputName, setInputName] = useState('');
    const [inputAlamat, setInputAlamat] = useState('');
    const [inputKontak, setInputKontak] = useState('');
    const [editId, setEditId] = useState<number | null>(null);

    // B. READ DATA: Ambil data dari server
    const { data: daftarAlamat, isLoading } = useQuery({
        queryKey: ['alamat-cache'],
        queryFn: fetchAlamatAPI,
    });

    // C. MUTATION HOOK: Menggunakan useCrudMutation
    // Perhatikan: Di sini murni hanya konfigurasi API dan Kunci Cache Server!
    const updateMutation = useCrudMutation({
        mutationFn: updateAlamatAPI,
        invalidateKeys: [['alamat-cache']],
    });

    // D. HANDLER SUBMIT (TEMPAT PEMANGGIlAN STATE UI)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputName.trim() || !inputAlamat.trim() || !inputKontak.trim() || updateMutation.isPending) return;

        if (editId) {
            // CARA PEMANGGILAAN `.mutate()` BARU:
            updateMutation.mutate(
                // Argumen 1: Payload dikirim masuk ke `<TPayload>` -> `config.mutationFn` -> `updateAlamatAPI`
                { id: editId, nama: inputName, alamat: inputAlamat, kontak: inputKontak },

                // Argumen 2: Callback lokal penanganan State UI yang dicopot dari atas
                {
                    onSuccess: () => {
                        // --- DI SINI POSISI PEMANGGILAN UNTUK MEMBERSIHKAN FORM ---
                        setInputName('');
                        setInputAlamat('');
                        setInputKontak('');
                        setEditId(null); // Keluar mode edit
                    },
                }
            );
        }
    };

    // Memicu form masuk ke mode edit saat tombol di baris data diklik
    const pemicuEdit = (data: DataAlamat) => {
        setEditId(data.id);
        setInputName(data.nama);
        setInputAlamat(data.alamat);
        setInputKontak(data.kontak);
    };

    if (isLoading) return <div className="p-8 text-center">Memuat data alamat...</div>;

    return (
        <div className="p-8 max-w-lg mx-auto bg-white rounded-xl shadow border border-gray-200 text-gray-800">
            <h1 className="text-xl font-bold mb-6 text-center">📖 Manajemen Buku Alamat</h1>

            {/* FORM INPUT UTAMA */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div>
                    <label className="text-xs font-semibold block mb-1 text-gray-600">Nama</label>
                    <input
                        type="text"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        className="w-full p-2 border rounded-lg bg-white text-gray-900"
                        placeholder="Masukkan nama..."
                    />
                </div>

                <div>
                    <label className="text-xs font-semibold block mb-1 text-gray-600">Alamat</label>
                    <input
                        type="text"
                        value={inputAlamat}
                        onChange={(e) => setInputAlamat(e.target.value)}
                        className="w-full p-2 border rounded-lg bg-white text-gray-900"
                        placeholder="Masukkan alamat..."
                    />
                </div>

                <div>
                    <label className="text-xs font-semibold block mb-1 text-gray-600">Kontak (HP)</label>
                    <input
                        type="text"
                        value={inputKontak}
                        onChange={(e) => setInputKontak(e.target.value)}
                        className="w-full p-2 border rounded-lg bg-white text-gray-900"
                        placeholder="Masukkan nomor kontak..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={updateMutation.isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg font-semibold disabled:bg-gray-300"
                >
                    {updateMutation.isPending ? 'Menyimpan...' : editId ? 'Simpan Perubahan' : 'Tambah Baru'}
                </button>
            </form>

            {/* DAFTAR TAMPILAN DATA */}
            <div className="space-y-3">
                <h2 className="font-bold text-gray-700 border-b pb-2">Daftar Alamat Tersimpan:</h2>
                {daftarAlamat?.map((item) => (
                    <div key={item.id} className="p-3 bg-gray-50 border rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-bold text-gray-900">{item.nama}</p>
                            <p className="text-xs text-gray-600">🏠 {item.alamat} | 📞 {item.kontak}</p>
                        </div>
                        <button
                            onClick={() => pemicuEdit(item)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}