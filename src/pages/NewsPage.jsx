import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api';
import { motion } from 'framer-motion'; // motion diimpor di sini

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

// ==================================================================
// =================== KOMPONEN NEWSCARD (DIUBAH) ===================
// ==================================================================
const NewsCard = ({ news }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link to={`/news/${news.slug}`} className="block group h-full bg-white rounded-xl shadow-md relative overflow-hidden">
        
        {/* Overlay Gradasi ditambahkan */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-90 transition-all duration-300"
          style={{
            background: 'linear-gradient(to right, #002874, #54C0DA)'
          }}
        ></div>

        {/* Konten dibungkus agar di atas overlay */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="relative">
            <img
              src={`http://ict-backend.test/storage/${news.thumbnail}`}
              alt={news.title}
              className="w-full h-48 object-cover" // Efek scale dihilangkan untuk konsistensi
            />
          </div>
          <div className="p-4 flex-grow flex flex-col">
            <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-white transition-colors duration-300 flex-grow">
              {news.title}
            </h3>
            <div className="mt-2 text-sm text-gray-600 group-hover:text-gray-200 transition-colors duration-300">
              <p className="font-medium">{news.author?.name || 'Admin'}</p>
              <p><span>{formatDate(news.created_at)}</span></p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};


// --- Skeleton Component ---
const NewsSkeleton = () => (
  <div className="flex flex-col animate-pulse">
    <div className="mb-3 rounded-xl bg-gray-300 h-48 w-full"></div>
    <div className="flex flex-col space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      <div className="h-3 bg-gray-300 rounded w-2/5"></div>
    </div>
  </div>
);

const NewsPage = () => {
  React.useEffect(() => {
    document.title = 'Berita - ICT Taruna Bakti';
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['newsItems'],
    queryFn: async () => {
      const response = await apiClient.get('/api/news');
      return response.data.data;
    },
  });

  return (
    <div className="bg-slate-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-10">Berita Terbaru</h1>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <NewsSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center p-20 text-red-500">Gagal memuat berita.</div>
        ) : data.length > 0 ? (
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