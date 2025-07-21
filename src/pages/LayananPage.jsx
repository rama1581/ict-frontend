import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWifi, FaEnvelopeOpenText, FaLaptopCode, FaQuestionCircle } from 'react-icons/fa';
import { motion } from 'framer-motion'; // <-- 1. Import motion

// Data untuk kartu-kartu layanan
const services = [
  { icon: <FaWifi size={32} className="text-indigo-600 group-hover:text-white transition-colors duration-300" />, title: 'Jaringan & Internet', description: 'Akses internet cepat dan stabil di seluruh area kampus melalui jaringan WiFi kami.', link: '/layanan/jaringan' },
  { icon: <FaEnvelopeOpenText size={32} className="text-indigo-600 group-hover:text-white transition-colors duration-300" />, title: 'Email & Akun', description: 'Manajemen akun email resmi Taruna Bakti dan layanan terkait lainnya.', link: '/layanan/email' },
  { icon: <FaLaptopCode size={32} className="text-indigo-600 group-hover:text-white transition-colors duration-300" />, title: 'Software & Aplikasi', description: 'Dapatkan lisensi dan akses ke berbagai software pendukung kegiatan belajar.', link: '/layanan/software' },
  { icon: <FaQuestionCircle size={32} className="text-indigo-600 group-hover:text-white transition-colors duration-300" />, title: 'Bantuan Teknis', description: 'Tim kami siap membantu Anda mengatasi berbagai kendala teknis yang dihadapi.', link: '/layanan/bantuan' }
];

const LayananPage = () => {
  useEffect(() => {
    document.title = 'Layanan - ICT Taruna Bakti';
  }, []);

  return (
    <div className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl tracking-tight">
            Layanan Teknologi Informasi
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Kami menyediakan berbagai layanan untuk mendukung seluruh aktivitas akademik di Yayasan Taruna Bakti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            // 👇 2. Bungkus setiap item dengan motion.div
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={service.link} className="block group h-full">
                <div className="flex items-start gap-6 bg-white p-8 rounded-2xl shadow-lg hover:shadow-indigo-200 hover:bg-indigo-600 transition-all duration-300 h-full">
                  <div className="bg-indigo-100 group-hover:bg-white/20 p-4 rounded-full transition-colors duration-300">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 group-hover:text-indigo-100 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LayananPage;