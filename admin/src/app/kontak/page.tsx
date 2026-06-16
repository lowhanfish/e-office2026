'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Interface Data
interface Kontak {
    id: number;
    name: string;
}

// ==========================================
// 1. LAYER API (Fungsi Murni)
// ==========================================

// GET (Read)
const getKontak = async (): Promise<Kontak[]> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=4');
    if (!res.ok) throw new Error('Gagal mengambil data kontak.');
    return res.json();
};

// POST (Create)
const createKontakAPI = async (name: string): Promise<Kontak> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error('Gagal menambah kontak baru.');
    return res.json();
};

// PUT (Update)
const updateKontakAPI = async (payload: { id: number; name: string }): Promise<Kontak> => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: payload.name }),
    });
    if (!res.ok) throw new Error('Gagal memperbarui kontak.');
    return res.json();
};

// DELETE (Delete)
const deleteKontakAPI = async (id: number): Promise<number> => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Gagal menghapus kontak.');
    return id;
};

// ==========================================
// 2. KOMPONEN UTAMA
// ==========================================
export default function KontakPage() {
    const queryClient = useQueryClient();
    const [inputName, setInputName] = useState('');
    const [editId, setEditId] = useState<number | null>(null);

    // ------------------------------------------
    // A. OPERASI GET (useQuery)
    // ------------------------------------------
    const { data: daftarKontak, isLoading, isError, error } = useQuery({
        queryKey: ['kontak'],
        queryFn: getKontak,
    });

    // ------------------------------------------
    // B. OPERASI POST (useMutation)
    // ------------------------------------------
    const createMutation = useMutation({
        mutationFn: createKontakAPI,
        onSuccess: () => {
            // Beritahu query ['kontak'] bahwa datanya sudah basi, tolong fetch ulang!
            queryClient.invalidateQueries({ queryKey: ['kontak'] });
            setInputName('');
        },
    });

    // ------------------------------------------
    // C. OPERASI PUT (useMutation)
    // ------------------------------------------
    const updateMutation = useMutation({
        mutationFn: updateKontakAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kontak'] });
            setInputName('');
            setEditId(null); // Keluar dari mode edit
        },
    });

    // ------------------------------------------
    // D. OPERASI DELETE (useMutation)
    // ------------------------------------------
    const deleteMutation = useMutation({
        mutationFn: deleteKontakAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kontak'] });
        },
    });

    // Handler Submit untuk Tambah ATAU Edit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputName.trim()) return;

        if (editId) {
            // Jika sedang dalam mode edit, jalankan PUT
            updateMutation.mutate({ id: editId, name: inputName });
        } else {
            // Jika tidak, jalankan POST
            createMutation.mutate(inputName);
        }
    };

    // Fungsi untuk memicu mode edit di form
    const pemicuEdit = (kontak: Kontak) => {
        setEditId(kontak.id);
        setInputName(kontak.name);
    };

    if (isLoading) return <div className="p-8 text-center">Memuat data kontak...</div>;
    if (isError) return <div className="p-8 text-center text-red-500">Error: {error.message}</div>;

    return (
        <div className="p-8 max-w-md mx-auto bg-white rounded-2xl shadow-md mt-10 text-gray-800 border border-amber-200">
            <h1 className="text-2xl font-bold text-amber-900 mb-6 font-poppins text-center">
                📖 Buku Kontak
            </h1>

            {/* FORM INPUT (Bisa untuk POST atau PUT) */}
            <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder={editId ? "Ubah nama kontak..." : "Nama kontak baru..."}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-400 transition-colors"
                >
                    {createMutation.isPending || updateMutation.isPending ? '...' : editId ? 'Simpan' : 'Tambah'}
                </button>
            </form>

            {/* DAFTAR TAMPILAN DATA (Hasil GET) */}
            <ul className="space-y-3">
                {daftarKontak?.map((kontak) => (
                    <li
                        key={kontak.id}
                        className="flex justify-between items-center p-3 bg-amber-50 border border-amber-100 rounded-xl"
                    >
                        <span className="font-roboto">{kontak.name}</span>

                        <div className="flex gap-3">
                            {/* Tombol EDIT (Memicu Form PUT) */}
                            <button
                                onClick={() => pemicuEdit(kontak)}
                                className="text-amber-600 hover:text-amber-800 text-sm font-semibold"
                            >
                                Edit
                            </button>

                            {/* Tombol HAPUS (Memicu DELETE) */}
                            <button
                                onClick={() => deleteKontakAPI(kontak.id)} // atau deleteMutation.mutate(kontak.id)
                                disabled={deleteMutation.isPending}
                                className="text-red-500 hover:text-red-700 text-sm font-semibold disabled:text-gray-300"
                            >
                                Hapus
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}