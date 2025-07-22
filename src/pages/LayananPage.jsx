import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWifi, FaEnvelopeOpenText, FaLaptopCode, FaQuestionCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Data untuk kartu-kartu layanan
const services = [
  { icon: FaWifi, title: 'Jaringan & Internet', description: 'Akses internet cepat dan stabil di seluruh area kampus melalui jaringan WiFi kami.', link: '/layanan/jaringan' },
  { icon: FaEnvelopeOpenText, title: 'Email & Akun', description: 'Manajemen akun email resmi Taruna Bakti dan layanan terkait lainnya.', link: '/layanan/email' },
  { icon: FaLaptopCode, title: 'Software & Aplikasi', description: 'Dapatkan lisensi dan akses ke berbagai software pendukung kegiatan belajar.', link: '/layanan/software' },
  { icon: FaQuestionCircle, title: 'Bantuan Teknis', description: 'Tim kami siap membantu Anda mengatasi berbagai kendala teknis yang dihadapi.', link: '/layanan/bantuan' }
];

const LayananPage = () => {
  useEffect(() => {
    document.title = 'Layanan - ICT Taruna Bakti';
  }, []);

  // Variasi animasi untuk Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-indigo-100 py-20">
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
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
            >
              <Link to={service.link} className="block group h-full">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden">
                  {/* Efek gradien di background saat hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-6 bg-indigo-100 group-hover:bg-white/30 p-4 rounded-full inline-block transition-colors duration-300">
                      <service.icon size={32} className="text-indigo-600 group-hover:text-white transition-colors duration-300" />
                    </div>
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