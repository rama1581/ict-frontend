import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Settings, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const supportLinks = [
  {
    icon: Activity,
    title: 'Status Layanan',
    description: 'Lihat status operasional semua layanan ICT secara real-time.',
    link: '/status-layanan'
  },
  {
    icon: HelpCircle,
    title: 'FAQ',
    description: 'Temukan jawaban dari pertanyaan yang sering diajukan oleh pengguna lain.',
    link: '/dukungan/faq'
  },
  {
    icon: Settings,
    title: 'Ajukan Bantuan',
    description: 'Isi formulir untuk meminta bantuan teknis langsung dari tim kami.',
    link: '/dukungan/kontak'
  }
];

const DukunganPage = () => {
  useEffect(() => {
    document.title = 'Pusat Dukungan - ICT Taruna Bakti';
  }, []);

  return (
    <div className="bg-gradient-to-b from-slate-50 to-gray-100 py-20">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {supportLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Link to={item.link} className="block group h-full">
                  <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl h-full transform hover:-translate-y-2 transition-all duration-300 text-center overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 flex flex-col items-center h-full">
                      <div className="bg-indigo-100 group-hover:bg-white/20 p-5 rounded-full mb-6 transition-colors duration-300">
                        <Icon size={32} className="text-indigo-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-2xl font-bold text-blue-900 mb-2 group-hover:text-white transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 group-hover:text-indigo-100 flex-grow transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default DukunganPage;
  