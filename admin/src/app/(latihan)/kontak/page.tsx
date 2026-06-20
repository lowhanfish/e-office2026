// app/kontak/page.tsx
'use client';

import { useState, type FormEvent } from 'react';
import { useCreateKontak, useDeleteKontak, useKontakList, useUpdateKontak } from '@/features/kontak/hooks';
import type { Kontak } from '@/features/kontak/api';

export default function KontakPage() {
  const { data: daftarKontak, isLoading, isError, error } = useKontakList();
  const createMutation = useCreateKontak();
  const updateMutation = useUpdateKontak();
  const deleteMutation = useDeleteKontak();

  const [inputName, setInputName] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const isMutating = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  const clearForm = () => {
    setInputName('');
    setEditId(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputName.trim() || isMutating) return;

    if (editId !== null) {
      updateMutation.mutate(
        { id: editId, name: inputName },
        {
          onSuccess: clearForm,
        }
      );
      return;
    }

    createMutation.mutate(
      { name: inputName },
      {
        onSuccess: clearForm,
      }
    );
  };

  const startEdit = (kontak: Kontak) => {
    setEditId(kontak.id);
    setInputName(kontak.name);
  };

  const cancelEdit = () => {
    clearForm();
  };

  if (isLoading) {
    return <div className="p-8 text-center text-amber-900 font-semibold">Memuat data kontak...</div>;
  }

  if (isError) {
    return <div className="p-8 text-center text-red-500 font-bold">Error: {error.message}</div>;
  }

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-2xl shadow-md mt-10 text-gray-800 border border-amber-200">
      <h1 className="text-2xl font-bold text-amber-900 mb-6 font-poppins text-center">📖 Buku Kontak</h1>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputName}
            onChange={(event) => setInputName(event.target.value)}
            placeholder={editId !== null ? 'Ubah nama kontak...' : 'Nama kontak baru...'}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 bg-white"
            disabled={isMutating}
          />
          <button
            type="submit"
            disabled={isMutating || !inputName.trim()}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-300 transition-colors"
          >
            {createMutation.isPending || updateMutation.isPending ? '...' : editId !== null ? 'Simpan' : 'Tambah'}
          </button>
        </div>

        {editId !== null && (
          <button
            type="button"
            onClick={cancelEdit}
            className="text-xs text-gray-500 hover:text-gray-700 underline"
            disabled={isMutating}
          >
            Batal Edit
          </button>
        )}
      </form>

      {createMutation.isError && <p className="text-sm text-red-500 mb-2">❌ Gagal menambah: {createMutation.error.message}</p>}
      {updateMutation.isError && <p className="text-sm text-red-500 mb-2">❌ Gagal mengubah: {updateMutation.error.message}</p>}
      {deleteMutation.isError && <p className="text-sm text-red-500 mb-2">❌ Gagal menghapus: {deleteMutation.error.message}</p>}

      <ul className="space-y-3">
        {daftarKontak?.map((kontak) => (
          <li
            key={kontak.id}
            className="flex justify-between items-center p-3 bg-amber-50 border border-amber-100 rounded-xl"
          >
            <span className="font-roboto text-gray-900">{kontak.name}</span>

            <div className="flex gap-3">
              <button
                onClick={() => startEdit(kontak)}
                className="text-amber-600 hover:text-amber-800 text-sm font-semibold disabled:text-gray-300"
                disabled={isMutating}
              >
                Edit
              </button>

              <button
                onClick={() => deleteMutation.mutate(kontak.id, { onSuccess: cancelEdit })}
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
