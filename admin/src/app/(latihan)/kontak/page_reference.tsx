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
    if (!res.ok) throw new Error('Gagal mengambil data kontak dari server.');
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
    if (!res.ok) throw new Error('Gagal memperbarui data kontak.');
    return res.json();
};

// DELETE (Delete)
const deleteKontakAPI = async (id: number): Promise<number> => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Gagal menghapus kontak ini.');
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

    // Global loading state untuk mutasi agar UI aman dari double-click
    const isMutating = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

    // Handler Submit Form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputName.trim() || isMutating) return;

        if (editId) {
            updateMutation.mutate({ id: editId, name: inputName });
        } else {
            createMutation.mutate(inputName);
        }
    };

    // Memicu form masuk ke mode edit
    const pemicuEdit = (kontak: Kontak) => {
        setEditId(kontak.id);
        setInputName(kontak.name);
    };

    // Membatalkan mode edit
    const batalkanEdit = () => {
        setEditId(null);
        setInputName('');
    };

    if (isLoading) return <div className="p-8 text-center text-amber-900 font-semibold">Memuat data kontak...</div>;
    if (isError) return <div className="p-8 text-center text-red-500 font-bold">Error: {error.message}</div>;

    return (
        <div className="p-8 max-w-md mx-auto bg-white rounded-2xl shadow-md mt-10 text-gray-800 border border-amber-200">
            <h1 className="text-2xl font-bold text-amber-900 mb-6 font-poppins text-center">
                📖 Buku Kontak
            </h1>

            {/* FORM INPUT */}
            <form onSubmit={handleSubmit} className="space-y-3 mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        placeholder={editId ? "Ubah nama kontak..." : "Nama kontak baru..."}
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 bg-white"
                        disabled={isMutating}
                    />
                    <button
                        type="submit"
                        disabled={isMutating || !inputName.trim()}
                        className="bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-300 transition-colors"
                    >
                        {createMutation.isPending || updateMutation.isPending ? '...' : editId ? 'Simpan' : 'Tambah'}
                    </button>
                </div>

                {/* Tombol tambahan untuk batal edit */}
                {editId && (
                    <button
                        type="button"
                        onClick={batalkanEdit}
                        className="text-xs text-gray-500 hover:text-gray-700 underline"
                        disabled={isMutating}
                    >
                        Batal Edit
                    </button>
                )}
            </form>

            {/* TAMPILAN ERROR INDIVIDU JIKA MUTASI GAGAL */}
            {createMutation.isError && <p className="text-sm text-red-500 mb-2">❌ Gagal menambah: {createMutation.error.message}</p>}
            {updateMutation.isError && <p className="text-sm text-red-500 mb-2">❌ Gagal mengubah: {updateMutation.error.message}</p>}
            {deleteMutation.isError && <p className="text-sm text-red-500 mb-2">❌ Gagal menghapus: {deleteMutation.error.message}</p>}

            {/* DAFTAR TAMPILAN DATA */}
            <ul className="space-y-3">
                {daftarKontak?.map((kontak) => (
                    <li
                        key={kontak.id}
                        className="flex justify-between items-center p-3 bg-amber-50 border border-amber-100 rounded-xl"
                    >
                        <span className="font-roboto text-gray-900">{kontak.name}</span>

                        <div className="flex gap-3">
                            {/* Tombol EDIT */}
                            <button
                                onClick={() => pemicuEdit(kontak)}
                                className="text-amber-600 hover:text-amber-800 text-sm font-semibold disabled:text-gray-300"
                                disabled={isMutating}
                            >
                                Edit
                            </button>

                            {/* Tombol HAPUS - SUDAH DIPERBAIKI MENGGUNAKAN deleteMutation.mutate */}
                            <button
                                onClick={() => deleteMutation.mutate(kontak.id)}
                                disabled={isMutating}
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