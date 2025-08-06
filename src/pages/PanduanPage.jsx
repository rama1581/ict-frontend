import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api';
import { FaWifi, FaKey, FaMicrosoft, FaLaptop } from 'react-icons/fa';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

// Peta Ikon
const iconMap = {
  FaWifi,
  FaKey,
  FaMicrosoft,
  FaLaptop
};

// ==================================================================
// ==================== KOMPONEN SKELETON BARU ======================
// ==================================================================
const GuideCardSkeleton = () => (
  <div className="bg-white p-8 rounded-2xl shadow-lg animate-pulse">
    <div className="bg-gray-200 rounded-full w-14 h-14 mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);


// Custom hook untuk debounce
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
    }
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
            placeholder="Cari panduan..."
            className="flex-grow text-gray-700 focus:outline-none text-base bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-2 rounded-full text-white font-semibold"
            style={{
              background: 'linear-gradient(to right, #002874, #54C0DA)'
            }}
          >
            {isLoading ? '...' : 'Cari'}
            <Search size={18} />
          </button>
        </motion.div>

        {/* Kontainer untuk hasil panduan */}
        <div className="min-h-[40vh]">
          {isLoading ? (
            // Tampilkan grid skeleton saat loading
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => <GuideCardSkeleton key={index} />)}
            </div>
          ) : isError ? (
            // Tampilkan pesan error jika gagal
            <p className="text-center text-red-500 font-semibold pt-8">Gagal memuat panduan. Silakan coba lagi.</p>
          ) : guides.length > 0 ? (
            // Tampilkan grid hasil jika ada data
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides.map((guide, index) => {
                const Icon = iconMap[guide.icon] || FaLaptop;
                return (
                  <motion.div
                    key={guide.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    className="h-full"
                  >
                    <Link to={guide.link} className="block group h-full">
                      <div className="bg-white p-8 rounded-2xl shadow-lg h-full transition-all duration-300 relative overflow-hidden">
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: 'linear-gradient(to right, #002874, #54C0DA)' }}
                        ></div>
                        <div className="relative z-10">
                          <div className="bg-indigo-100 group-hover:bg-white/20 p-4 rounded-full inline-block mb-4 transition-colors duration-300">
                            <Icon size={28} className="text-indigo-600 group-hover:text-white transition-colors duration-300" />
                          </div>
                          <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-white transition-colors duration-300">
                            {guide.title}
                          </h3>
                          <p className="text-slate-600 group-hover:text-gray-200 text-sm transition-colors duration-300">
                            Kategori: {guide.category}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            // Tampilkan pesan jika tidak ada hasil
            <p className="text-center text-gray-500 mt-8">
              {debouncedSearchTerm 
                ? `Panduan untuk "${debouncedSearchTerm}" tidak ditemukan.` 
                : "Belum ada panduan yang tersedia."
              }
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PanduanPage;