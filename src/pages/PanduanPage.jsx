import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWifi, FaKey, FaMicrosoft, FaLaptop, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Data untuk daftar panduan
const allGuides = [
  { id: 1, title: 'Cara Menghubungkan ke WiFi Kampus', link: '/panduan/wifi', category: 'Jaringan', icon: FaWifi },
  { id: 2, title: 'Panduan Reset Password Email', link: '/panduan/reset-password', category: 'Akun', icon: FaKey },
  { id: 3, title: 'Instalasi Microsoft Office 365', link: '/panduan/office-365', category: 'Software', icon: FaMicrosoft },
  { id: 4, title: 'Menggunakan Sistem Akademik', link: '/panduan/siakad', category: 'Aplikasi', icon: FaLaptop },
];

const PanduanPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGuides, setFilteredGuides] = useState(allGuides);

  useEffect(() => {
    document.title = 'Pusat Panduan - ICT Taruna Bakti';
  }, []);

  useEffect(() => {
    const results = allGuides.filter(guide =>
      guide.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGuides(results);
  }, [searchTerm]);

  return (
    <div className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl">Pusat Panduan</h1>
          <p className="mt-4 text-xl text-slate-600">Temukan panduan dan tutorial untuk menggunakan layanan ICT kami.</p>
        </div>

        {/* Fitur Pencarian */}
        <div className="relative mb-12 max-w-2xl mx-auto">
            <input 
                type="text"
                placeholder="Cari panduan..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Daftar Panduan dalam Bentuk Grid */}
        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link to={guide.link} className="block group h-full">
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl h-full transform hover:-translate-y-1.5 transition-all duration-300">
                      <div className="bg-indigo-100 p-4 rounded-full inline-block mb-4">
                        <Icon size={28} className="text-indigo-600" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        Kategori: {guide.category}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8">Panduan yang Anda cari tidak ditemukan.</p>
        )}

      </div>
    </div>
  );
};

export default PanduanPage;