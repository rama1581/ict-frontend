import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../services/api';

// --- Helper Function untuk Format Tanggal ---
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

const NewsDetailPage = () => {
  const { slug } = useParams(); // Mengambil 'slug' dari URL
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await apiClient.get(`/api/news/${slug}`);
        setNewsItem(response.data);
      } catch (err) {
        setError("Berita tidak ditemukan.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [slug]); // Efek ini akan berjalan lagi jika slug berubah

  if (loading) return <div className="text-center p-20">Memuat berita...</div>;
  if (error) return <div className="text-center p-20 text-red-500">{error}</div>;
  if (!newsItem) return null; // Jika item tidak ada, jangan render apa-apa

  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article>
          {/* Tombol Kembali */}
          <Link to="/news" className="text-blue-800 hover:underline mb-8 inline-block">
            &larr; Kembali ke semua berita
          </Link>

          {/* Kategori & Tanggal */}
          <div className="flex items-center gap-4 mb-4">
            {newsItem.category && (
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                {newsItem.category.name}
              </span>
            )}
            <span className="text-sm text-gray-500">{formatDate(newsItem.created_at)}</span>
          </div>

          {/* Judul Berita */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            {newsItem.title}
          </h1>
          
          {/* Info Penulis */}
          <p className="text-lg text-gray-600 mb-8">
            Oleh: <span className="font-semibold">{newsItem.author?.name || 'Admin'}</span>
          </p>

          {/* Gambar Thumbnail */}
          {newsItem.thumbnail && (
            <img
              src={`http://ict-backend.test/storage/${newsItem.thumbnail}`}
              alt={newsItem.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg mb-8"
            />
          )}

          {/* Isi Konten Berita */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: newsItem.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default NewsDetailPage;