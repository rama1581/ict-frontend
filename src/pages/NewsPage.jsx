import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api';

// --- Helper Function untuk Format Tanggal dan Jam ---
const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateString).toLocaleString('id-ID', options).replace('.', ':');
};

// --- Komponen Kartu Berita (Gaya YouTube) ---
const NewsCard = ({ news }) => {
  return (
    <div className="flex flex-col group">
      <Link to={`/news/${news.slug}`} className="block mb-3">
        <div className="relative overflow-hidden rounded-xl shadow-md">
          <img
            src={`http://ict-backend.test/storage/${news.thumbnail}`}
            alt={news.title}
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="flex">
        <div className="flex-grow">
          <Link to={`/news/${news.slug}`}>
            <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-blue-800 transition-colors">
              {news.title}
            </h3>
          </Link>
          <div className="mt-1 text-sm text-gray-600">
            <p className="font-medium text-gray-800">{news.author?.name || 'Admin'}</p>
            <p><span>{formatDate(news.created_at)}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Komponen Utama Halaman News ---
const NewsPage = () => {
  React.useEffect(() => {
    document.title = 'Pengumuman - ICT Taruna Bakti';
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['newsItems'],
    queryFn: async () => {
      const response = await apiClient.get('/api/news');
      return response.data.data;
    },
  });

  if (isLoading) return <div className="text-center p-20">Memuat pengumuman...</div>;
  if (isError) return <div className="text-center p-20 text-red-500">Gagal memuat berita.</div>;

  return (
    <div className="bg-slate-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-10">Pengumuman Layanan</h1>
        
        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {data.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Belum ada pengumuman.</p>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
