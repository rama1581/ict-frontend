import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';

const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await apiClient.get('/api/posts');
                setPosts(response.data.data);
            } catch (err) {
                console.error("Gagal mengambil data berita:", err);
                setError("Tidak dapat memuat data berita.");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <p className="text-xl text-gray-400 animate-pulse">Memuat berita...</p>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center min-h-screen">
            <p className="text-xl text-red-500 font-semibold">{error}</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">
                Informasi Terbaru
            </h1>

            {posts.length > 0 ? (
                <div className="space-y-16">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                        >
                            {/* 1. TAMPILKAN GAMBAR DI SINI */}
                            {post.image && (
                                <img
                                    src={`http://127.0.0.1:8000/storage/${post.image}`}
                                    alt={post.title}
                                    className="w-full h-72 object-cover"
                                />
                            )}

                            <div className="p-8">
                                <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                                    {post.title}
                                </h2>

                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                    Oleh: <span className="font-semibold">{post.author?.name || 'Anonim'}</span> | Kategori:{' '}
                                    <span className="font-semibold">{post.category?.name || 'Tanpa Kategori'}</span>
                                </p>

                                {/* 2. PROSE AKAN BEKERJA SETELAH PLUGIN DI-INSTALL */}
                                <div
                                    className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
                                    dangerouslySetInnerHTML={{ __html: post.body }}
                                />
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 text-lg mt-12">
                    Belum ada berita yang dipublikasikan.
                </p>
            )}
        </div>
    );
};

export default PostPage;