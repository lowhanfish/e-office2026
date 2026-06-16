'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

interface Post {
    id: number;
    title: string;
    body: string;
}

// 1. Fungsi Fetcher sekarang menerima argumen ID
const getPostById = async (id: string): Promise<Post> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    if (!response.ok) {
        throw new Error(`Gagal mengambil artikel dengan ID: ${id}`);
    }

    return response.json();
};

export default function DetailPostPage() {
    // Mengambil ID dari URL Next.js (misal: /belajar-query/3 -> id = "3")
    const params = useParams();
    const postId = params.id as string;

    // 2. Gunakan useQuery dengan queryKey dinamis
    const { data: post, isLoading, isError, error } = useQuery({
        // Kita masukkan postId ke dalam array queryKey
        queryKey: ['posts', postId],

        // Kita panggil fungsi fetcher di dalam arrow function sambil mengoper postId
        queryFn: () => getPostById(postId),

        // Fitur Tambahan (Opsional): Jangan jalankan query jika postId belum ada
        enabled: !!postId,
    });

    if (isLoading) {
        return <div className="p-8 text-center text-gray-600">Memuat artikel nomor {postId}...</div>;
    }

    if (isError) {
        return <div className="p-8 text-center text-red-500">⚠️ Error: {error.message}</div>;
    }

    return (
        <div className="p-8 max-w-xl mx-auto bg-white rounded-2xl shadow mt-10 border border-amber-200">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-1 rounded">
                Artikel Kategori {post?.id}
            </span>
            <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-4 font-poppins capitalize">
                {post?.title}
            </h1>
            <p className="text-gray-700 leading-relaxed font-roboto">
                {post?.body}
            </p>
        </div>
    );
}