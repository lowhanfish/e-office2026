'use client'; // Wajib karena kita menggunakan hook dari TanStack Query

import { useQuery } from '@tanstack/react-query';

// 1. Tentukan Struktur Data (TypeScript)
interface Post {
    id: number;
    name: string;
    body: string;
}

// 2. Buat Fungsi Fetcher Murni
// Fungsi ini tugasnya hanya mengambil data dari server dan mengembalikan Promise.
const getPosts = async (): Promise<Post[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=10');

    // TanStack Query mendeteksi error jika fungsi ini melempar (throw) Error
    if (!response.ok) {
        throw new Error('Gagal mengambil data dari server, coba cek koneksi Anda.');
    }

    return response.json();
};

export default function BelajarQueryPage() {
    // 3. Gunakan useQuery
    const { data: posts, isLoading, isError, error } = useQuery({
        queryKey: ['posts'], // Label unik untuk cache data ini
        queryFn: getPosts,    // Fungsi fetcher yang kita buat di atas
    });

    // Kondisi 1: Layar saat data sedang dimuat
    if (isLoading) {
        return (
            <div className="p-8 text-center">
                <div className="animate-spin inline-block w-8 h-8 border-4 border-amber-500 rounded-full border-t-transparent"></div>
                <p className="mt-2 text-gray-600">Sedang mengambil data terbaru...</p>
            </div>
        );
    }

    // Kondisi 2: Layar saat terjadi error dari server
    if (isError) {
        return (
            <div className="p-8 text-center text-red-500 font-semibold">
                ⚠️ Terjadi Kesalahan: {error.message}
            </div>
        );
    }

    // Kondisi 3: Sukses, data berhasil ditampilkan
    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 font-poppins">
                Artikel Terbaru
            </h1>

            <div className="space-y-4">
                {posts?.map((post) => (
                    <article key={post.id} className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-semibold text-amber-900 mb-2 font-roboto capitalize">
                            {post.name}
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {post.body}
                        </p>
                    </article>
                ))}
            </div>
        </div>
    );
}