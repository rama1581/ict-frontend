import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api';
import { HelpCircle, Settings, Activity, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';

// Peta Ikon untuk menerjemahkan nama ikon dari API menjadi komponen
const iconMap = {
  Settings,
  HelpCircle,
  Activity,
  Ticket
};

// ==================================================================
// ==================== KOMPONEN SKELETON BARU ======================
// ==================================================================
const SupportCardSkeleton = () => (
  <div className="relative bg-white p-8 rounded-2xl shadow-lg h-full text-center animate-pulse">
    <div className="flex flex-col items-center h-full">
      <div className="bg-gray-200 rounded-full w-20 h-20 mb-6"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
);


const DukunganPage = () => {
  useEffect(() => {
    document.title = 'Pusat Dukungan - ICT Taruna Bakti';
  }, []);

  const { data: supportLinks, isLoading, isError } = useQuery({
    queryKey: ['supportLinks'],
    queryFn: async () => {
      const response = await apiClient.get('/api/support-links');
      return response.data.items || [];
    }
  });

  return (
    <div className="bg-gradient-to-b from-slate-50 to-gray-100 py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl tracking-tight">
            Pusat Dukungan
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Butuh bantuan? Periksa status layanan, temukan jawaban, atau hubungi tim kami langsung.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {isLoading ? (
            // Jika sedang loading, tampilkan 4 skeleton card
            [...Array(4)].map((_, index) => <SupportCardSkeleton key={index} />)
          ) : isError ? (
            // Jika error, tampilkan pesan di dalam layout
            <div className="col-span-full text-center py-16">
              <p className="text-red-500 font-semibold">Gagal memuat data dukungan.</p>
              <p className="text-slate-600 mt-1">Silakan coba lagi beberapa saat nanti.</p>
            </div>
          ) : supportLinks.length > 0 ? (
            // Jika data tersedia, tampilkan kartu dukungan
            supportLinks.map((item, index) => {
              const Icon = iconMap[item.icon] || HelpCircle;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Link to={item.link} className="block group h-full">
                    <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl h-full transition-all duration-300 text-center overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: 'linear-gradient(to right, #002874, #54C0DA)'
                        }}
                      ></div>
                      
                      <div className="relative z-10 flex flex-col items-center h-full">
                        <div className="bg-indigo-100 group-hover:bg-white/20 p-5 rounded-full mb-6 transition-colors duration-300">
                          <Icon size={32} className="text-indigo-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-white transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 group-hover:text-gray-200 flex-grow transition-colors duration-300 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          ) : (
            // Jika data kosong
            <div className="col-span-full text-center py-16">
              <p className="text-slate-500">Saat ini belum ada tautan dukungan yang tersedia.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DukunganPage;