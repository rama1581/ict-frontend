import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/api';

// --- Helper Function untuk Format Tanggal ---
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

// --- Komponen Kartu Berita (Gaya YouTube) ---
const NewsCard = ({ news }) => {
  return (
    <div className="flex flex-col group">
      {/* Thumbnail Gambar */}
      <Link to={`/news/${news.slug}`} className="block mb-3">
        <div className="relative overflow-hidden rounded-xl shadow-md">
          <img
             src={`http://ict-backend.test/storage/${news.thumbnail}`}
            alt={news.title}
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Detail Konten */}
      <div className="flex">
        {/* Di sini bisa ditambahkan avatar penulis jika ada */}
        <div className="flex-grow">
          <Link to={`/news/${news.slug}`}>
            <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-blue-800 transition-colors">
              {news.title}
            </h3>
          </Link>
          <div className="mt-1 text-sm text-gray-600">
            {/* Nama Penulis */}
            <p>{news.author?.name || 'Admin'}</p>
            {/* Kategori dan Tanggal */}
            <p>
              <span>{news.category?.name || 'Umum'}</span>
              <span className="mx-1.5">&bull;</span>
              <span>{formatDate(news.created_at)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Komponen Utama Halaman News ---
const NewsPage = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await apiClient.get('/api/news');
        setNewsItems(response.data.data);
      } catch (err) {
        setError("Gagal memuat berita.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <div className="text-center p-20">Memuat berita...</div>;
  if (error) return <div className="text-center p-20 text-red-500">{error}</div>;

  return (
    <div className="bg-slate-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-10">Berita & Informasi</h1>
        
        {newsItems.length > 0 ? (
          // Grid responsif seperti YouTube
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {newsItems.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Belum ada berita yang dipublikasikan.</p>
        )}
      </div>
    </div>
  );
};

export default NewsPage;