import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api'; // Pastikan path ini benar
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

// Custom hook untuk debounce (tidak berubah)
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// Komponen Card untuk Panduan (Gaya Baru)
const GuideCard = ({ guide }) => (
  <motion.div
    whileHover={{ y: -8 }}
    transition={{ duration: 0.3 }}
    className="h-full"
  >
    <Link to={`/panduan/${guide.slug}`} className="block group h-full bg-white rounded-xl shadow-md relative overflow-hidden">
      {/* Overlay Gradasi */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-90 transition-all duration-300"
        style={{ background: 'linear-gradient(to right, #002874, #54C0DA)' }}
      ></div>

      {/* Konten Kartu */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="relative">
          <img
            src={guide.thumbnail ? `http://ict-backend.test/storage/${guide.thumbnail}` : 'https://placehold.co/600x400/e2e8f0/e2e8f0?text='}
            alt={guide.title}
            className="w-full h-48 object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/e2e8f0/94a3b8?text=Image+Not+Found'; }}
          />
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-white transition-colors duration-300 flex-grow">
            {guide.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 group-hover:text-gray-200 transition-colors duration-300">
            Kategori: {guide.category}
          </p>
        </div>
      </div>
    </Link>
  </motion.div>
);

// Komponen Skeleton untuk Kartu Panduan (Gaya Baru)
const GuideCardSkeleton = () => (
    <div className="flex flex-col animate-pulse bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gray-300 h-48 w-full"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );

const PanduanPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    document.title = 'Pusat Panduan - ICT Taruna Bakti';
  }, []);
  
  const { data: guides = [], isLoading, isError } = useQuery({
    queryKey: ['guides', debouncedSearchTerm], 
    queryFn: async () => {
      const response = await apiClient.get('/api/guides', {
        params: { search: debouncedSearchTerm }
      });
      return response.data.data || [];
    },
    enabled: true, // Query akan selalu berjalan
  });

  return (
    <div className="bg-slate-50 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl">Pusat Panduan</h1>
          <p className="mt-4 text-xl text-slate-600">Temukan panduan dan tutorial untuk menggunakan layanan ICT kami.</p>
        </div>

        {/* Fitur Pencarian */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center max-w-2xl mx-auto bg-white rounded-full shadow-lg px-6 py-3 mb-16"
        >
          <input
            type="text"
            placeholder="Cari panduan berdasarkan judul atau kategori..."
            className="flex-grow text-gray-700 focus:outline-none text-base bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
           <div className="pl-4">
             <Search size={20} className="text-gray-400" />
           </div>
        </motion.div>

        {/* Kontainer untuk hasil panduan */}
        <div className="min-h-[40vh]">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => <GuideCardSkeleton key={index} />)}
            </div>
          ) : isError ? (
            <p className="text-center text-red-500 font-semibold pt-8">Gagal memuat panduan. Silakan coba lagi nanti.</p>
          ) : guides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {guides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-8 text-lg">
              {debouncedSearchTerm 
                ? `Panduan untuk "${debouncedSearchTerm}" tidak ditemukan.` 
                : "Belum ada panduan yang tersedia saat ini."
              }
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PanduanPage;