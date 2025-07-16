import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';

const BeritaPage = () => {
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-400 animate-pulse">Memuat berita...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500 font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-10 text-gradient bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
        Daftar Berita
      </h1>

      {posts.length > 0 ? (
        <div className="space-y-12">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                {post.title}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Oleh: <span className="font-semibold">{post.author?.name || 'Anonim'}</span> | Kategori:{' '}
                <span className="font-semibold">{post.category?.name || 'Tanpa Kategori'}</span>
              </p>

              <div
                className="prose prose-indigo dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
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

export default BeritaPage;
