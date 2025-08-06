import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api';
import {
  Network,
  MailOpen,
  AppWindow,
  LifeBuoy
} from 'lucide-react'; 
import { motion } from 'framer-motion';

// Peta Ikon untuk menerjemahkan nama ikon dari API menjadi komponen
const iconMap = {
  Network,
  MailOpen,
  AppWindow,
  LifeBuoy
};

// ==================================================================
// ==================== KOMPONEN SKELETON BARU ======================
// ==================================================================
const ServiceCardSkeleton = () => (
  <div className="bg-white p-8 rounded-2xl shadow-lg h-full animate-pulse">
    <div className="mb-6 bg-gray-200 rounded-full w-16 h-16"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6 mt-2"></div>
  </div>
);


const LayananPage = () => {
  useEffect(() => {
    document.title = 'Layanan - ICT Taruna Bakti';
  }, []);

  const { data: servicesData, isLoading, isError } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await apiClient.get('/api/services');
      // Kita asumsikan API mengembalikan struktur { "items": [...] }
      return response.data.items || []; 
    }
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-indigo-100 py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-blue-900 sm:text-5xl tracking-tight"
          >
            Layanan Teknologi Informasi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Kami menyediakan berbagai layanan untuk mendukung seluruh aktivitas akademik di Yayasan Taruna Bakti.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading ? (
            // Jika sedang loading, tampilkan 4 buah skeleton card
            [...Array(4)].map((_, index) => <ServiceCardSkeleton key={index} />)
          ) : isError ? (
            // Jika terjadi error, tampilkan pesan error di dalam grid
            <div className="col-span-full text-center py-20">
              <p className="text-red-500 font-semibold">Gagal memuat data layanan.</p>
              <p className="text-slate-600 mt-2">Silakan coba lagi beberapa saat lagi.</p>
            </div>
          ) : servicesData && servicesData.length > 0 ? (
            // Jika data berhasil dimuat dan tidak kosong, tampilkan kartu layanan
            servicesData.map((service, index) => {
              const Icon = iconMap[service.icon] || Network;
              return (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  custom={index}
                >
                  <Link to={service.link} className="block group h-full">
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(to right, #002874, #54C0DA)'
                        }}
                      ></div>

                      <div className="relative z-10">
                        <div className="mb-6 bg-indigo-100 group-hover:bg-white/30 p-4 rounded-full inline-block transition-colors duration-300">
                          <Icon
                            size={36}
                            strokeWidth={2}
                            className="text-indigo-600 group-hover:text-white transition-colors duration-300"
                          />
                        </div>
                        <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-white transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-slate-600 group-hover:text-gray-200 transition-colors duration-300">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          ) : (
            // Jika data berhasil dimuat tapi kosong
            <div className="col-span-full text-center py-20">
              <p className="text-slate-500 font-semibold">Saat ini belum ada layanan yang tersedia.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LayananPage;