import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../services/api';

// --- Helper Function untuk Format Tanggal ---
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

const NewsDetailPage = () => {
  const { slug } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect untuk mengatur judul tab browser
  useEffect(() => {
    // Jika data berita sudah ada, atur judulnya sesuai judul berita
    if (newsItem) {
      document.title = `${newsItem.title} - ICT Taruna Bakti`;
    } else {
      // Judul default saat sedang loading atau error
      document.title = 'Memuat Berita...';
    }
  }, [newsItem]); // Efek ini akan berjalan setiap kali 'newsItem' berubah

  // useEffect untuk mengambil data dari API
  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
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
  }, [slug]);

  if (loading) return <div className="text-center p-20">Memuat berita...</div>;
  if (error) return <div className="text-center p-20 text-red-500">{error}</div>;
  if (!newsItem) return null;

  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article>
          <Link to="/pengumuman" className="text-blue-800 hover:underline mb-8 inline-block">
            &larr; Kembali ke semua berita
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            {/* Bagian ini akan tampil jika data category ada */}
            {newsItem.category && (
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                {newsItem.category.name}
              </span>
            )}
            <span className="text-sm text-gray-500">{formatDate(newsItem.created_at)}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            {newsItem.title}
          </h1>
          
          {/* Bagian ini akan tampil jika data author ada */}
          <p className="text-lg text-gray-600 mb-8">
            Oleh: <span className="font-semibold">{newsItem.author?.name || 'Admin'}</span>
          </p>

          {newsItem.thumbnail && (
            <img
              src={`http://ict-backend.test/storage/${newsItem.thumbnail}`}
              alt={newsItem.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg mb-8"
            />
          )}

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