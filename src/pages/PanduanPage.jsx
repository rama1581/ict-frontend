import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWifi, FaKey, FaMicrosoft, FaLaptop } from 'react-icons/fa';
import { Search } from 'lucide-react'; // <-- Icon Search ditambahkan
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

        {/* ================================================================== */}
        {/* ================== FITUR PENCARIAN (DIUBAH) ==================== */}
        {/* ================================================================== */}
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
            Cari
            <Search size={18} />
          </button>
        </motion.div>

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
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <Link to={guide.link} className="block group h-full">
                    <div className="bg-white p-8 rounded-2xl shadow-lg h-full transition-all duration-300 relative overflow-hidden">
                      
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(to right, #002874, #54C0DA)'
                        }}
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
          <p className="text-center text-gray-500 mt-8">Panduan yang Anda cari tidak ditemukan.</p>
        )}

      </div>
    </div>
  );
};

export default PanduanPage;