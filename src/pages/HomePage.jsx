import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Network,
  MailOpen,
  AppWindow,
  LifeBuoy,
  HelpCircle,
  Settings,
  Activity,
  Search,
  Newspaper,
  Server,
  BookOpen,
  MessageSquare,
  Megaphone
} from 'lucide-react';

// Data statis untuk pencarian
const servicesData = [
  { icon: Network, title: 'Jaringan & Internet', description: 'Civitas dibekali dengan kemampuan untuk mengakses dan memanfaatkan jaringan serta koneksi internet kampus secara optimal sebagai pendukung utama proses pembelajaran.', link: '/layanan/jaringan' },
  { icon: MailOpen, title: 'Email & Akun', description: 'Civitas memiliki pemahaman yang baik dalam mengelola akun dan email institusi secara profesional untuk keperluan akademik dan komunikasi resmi.', link: '/layanan/email' },
  { icon: AppWindow, title: 'Akademik', description: 'Civitas didorong untuk menjadi individu yang mandiri, disiplin, dan kompeten dalam menjalani kegiatan akademik secara digital dan terintegrasi.', link: '/layanan/software' },
  { icon: LifeBuoy, title: 'Bantuan Teknis', description: 'Civitas diarahkan untuk memahami prosedur permintaan bantuan teknis serta mampu berkomunikasi dengan teknisi secara efektif guna menyelesaikan kendala teknologi yang dihadapi.', link: '/layanan/bantuan' }
];
const guidesData = [{ title: 'Panduan', link: '/panduan' }];
const supportData = [
  { title: 'Pengajuan Layanan', link: '/dukungan/kontak' },
  { title: 'FAQ (Pertanyaan Umum)', link: '/dukungan/faq' },
  { title: 'Status Layanan', link: '/status-layanan' },
  { title: 'Status Pengajuan', link: '/status-pengajuan' }
];
const announcementsData = [{ title: 'Pengumuman', link: '/pengumuman' }];

// Custom hook untuk debounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => { clearTimeout(handler); };
  }, [value, delay]);
  return debouncedValue;
}

const backgroundImages = ['/bg-1.jpg', '/bg-2.jpg', '/bg-3.jpg', '/bg-4.jpg'];
const BackgroundSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex]);
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      {backgroundImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Background ${index + 1}`}
          className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  );
};

function decodeHtmlEntities(str) {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

function formatDate(dateString) {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const searchRef = useRef(null);

  const { data: allNews = [] } = useQuery({
    queryKey: ['allNews'],
    queryFn: async () => {
      const response = await apiClient.get('/api/news');
      return response.data.data;
    },
  });

  useEffect(() => {
    const performSearch = async () => {
      const query = debouncedSearchTerm.toLowerCase();
      if (query.length < 3) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }
      setIsSearching(true);
      const newsResults = allNews
        .filter(news => news.title.toLowerCase().includes(query))
        .map(news => ({ type: 'Berita', title: news.title, link: `/news/${news.slug}`, icon: <Newspaper size={20} className="text-gray-400" /> }));
      const servicesResults = servicesData
        .filter(service => service.title.toLowerCase().includes(query))
        .map(service => ({ type: 'Layanan', title: service.title, link: service.link, icon: <Server size={20} className="text-gray-400" /> }));
      const guidesResults = guidesData
        .filter(guide => guide.title.toLowerCase().includes(query))
        .map(guide => ({ type: 'Halaman', title: guide.title, link: guide.link, icon: <BookOpen size={20} className="text-gray-400" /> }));
      const supportResults = supportData
        .filter(item => item.title.toLowerCase().includes(query))
        .map(item => ({ type: 'Dukungan', title: item.title, link: item.link, icon: <MessageSquare size={20} className="text-gray-400" /> }));
      const announcementsResults = announcementsData
        .filter(item => item.title.toLowerCase().includes(query))
        .map(item => ({ type: 'Halaman', title: item.title, link: item.link, icon: <Megaphone size={20} className="text-gray-400" /> }));
      const combinedResults = [...newsResults, ...servicesResults, ...guidesResults, ...supportResults, ...announcementsResults];
      setSearchResults(combinedResults);
      setIsSearching(false);
    };
    performSearch();
  }, [debouncedSearchTerm, allNews]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchTerm('');
        setSearchResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => { document.removeEventListener("mousedown", handleClickOutside); };
  }, [searchRef]);

  const featuredNews = allNews.slice(0, 3);
  
  useEffect(() => {
    document.title = 'Beranda - ICT Taruna Bakti';
  }, []);

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden min-h-[80vh] flex items-center"
        style={{ background: 'linear-gradient(135deg, #002874, #54C0DA)' }}
      >
        <BackgroundSlideshow />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10" />
        <div className="relative z-20 container mx-auto px-6 md:px-20 py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 space-y-6 text-white">
            <h1 className="text-3xl md:text-4xl font-extrabold">
              Selamat Datang di Layanan IT <br />
              <span className="text-white">Yayasan Taruna Bakti</span>
            </h1>
            <p className="max-w-md text-blue-100">
              Layanan ini hadir untuk mendukung seluruh civitas akademika dalam pemanfaatan teknologi informasi secara efektif, aman, dan terintegrasi.
            </p>
            <div className="relative max-w-xl" ref={searchRef}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center bg-white rounded-full shadow-lg px-6 py-3 mt-4"
              >
                <input
                  type="text"
                  placeholder="Cari berita, layanan, panduan..."
                  className="flex-grow text-gray-700 focus:outline-none text-base bg-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  className="flex items-center gap-2 px-6 py-2 rounded-full text-white font-semibold"
                  style={{ background: 'linear-gradient(to right, #002874, #54C0DA)', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'}}
                >
                  {isSearching ? '...' : 'Cari'}
                  <Search size={18} />
                </button>
              </motion.div>
              <AnimatePresence>
                {searchTerm.length >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-lg overflow-hidden z-30"
                  >
                    {isSearching ? (
                      <div className="p-4 text-center text-gray-500">Mencari...</div>
                    ) : searchResults.length > 0 ? (
                      <ul className="max-h-80 overflow-y-auto">
                        {searchResults.map((result, index) => (
                          <li key={index}>
                            <Link 
                              to={result.link} 
                              onClick={() => setSearchTerm('')}
                              className="flex items-center gap-4 px-6 py-4 hover:bg-gray-100 transition-colors"
                            >
                              {result.icon}
                              <div>
                                <p className="font-semibold text-gray-800">{result.title}</p>
                                <p className="text-xs text-gray-500">{result.type}</p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-4 text-center text-gray-500">Hasil tidak ditemukan.</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img src="/logobg.png" alt="Logo" className="w-64 md:w-80 object-contain" />
          </div>
        </div>
      </section>

      {/* Bagian Layanan */}
      <section className="py-20 px-4 md:px-20 bg-gray-50">
        <div className="text-center mb-16">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-blue-900">Layanan Yang Tersedia</motion.h2>
          <motion.p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Layanan teknologi informasi yang dapat diakses oleh seluruh civitas Yayasan Taruna Bakti.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {servicesData.map((item) => (
            <motion.div key={item.title}>
              <Link to={item.link} className="block group h-full">
                <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl h-full overflow-hidden transition-all duration-300">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to right, #002874, #54C0DA)' }}/>
                  <div className="relative z-10">
                    <div className="mb-6 bg-indigo-100 group-hover:bg-white/20 p-4 rounded-full inline-block transition-colors duration-300">
                      <item.icon size={36} className="text-indigo-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-white transition-colors duration-300">{item.title}</h3>
                    <p className="text-slate-600 group-hover:text-gray-200 transition-colors duration-300">{item.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* ==================== BAGIAN BERITA (DIUBAH) ====================== */}
      {/* ================================================================== */}
      <section className="py-20 bg-white px-4 md:px-20">
        <div className="text-center mb-16">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-blue-900">Berita Terbaru</motion.h2>
          <motion.p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Informasi dan kabar terkini dari lingkungan Yayasan
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredNews.map((news) => (
            <motion.div key={news.id} whileHover={{ y: -8 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="h-full">
              <Link to={`/news/${news.slug}`} className="block group bg-white rounded-lg shadow-md h-full relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-90 transition-all duration-300" style={{ background: 'linear-gradient(to right, #002874, #54C0DA)' }}></div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="relative">
                    <img src={`http://ict-backend.test/storage/${news.thumbnail}`} alt={news.title} className="w-full h-56 object-cover"/>
                    <div className="absolute bottom-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow">{formatDate(news.created_at)}</div>
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-white transition-colors duration-300">{news.title}</h3>
                    <p className="text-slate-600 group-hover:text-gray-200 transition-colors duration-300 text-sm leading-relaxed">{decodeHtmlEntities(news.content.replace(/<[^>]+>/g, '').slice(0, 120))}...</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/pengumuman" className="inline-block px-8 py-3 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:brightness-110" style={{ background: 'linear-gradient(to right, #002874, #54C0DA)' }}>
            Lihat Semua Berita
          </Link>
        </div>
      </section>

      {/* Bagian Pusat Dukungan */}
      <section className="py-20 px-4 md:px-20 bg-gray-50">
        <div className="text-center mb-16">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-blue-900">Pusat Dukungan & Bantuan</motion.h2>
          <motion.p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Temukan informasi status layanan terkini, pertanyaan yang sering diajukan (FAQ), dan ajukan permintaan layanan atau bantuan teknis dengan mudah.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: Activity, title: 'Status Layanan', description: 'Informasi gangguan dan jadwal pemeliharaan.', link: '/status-layanan' },
            { icon: HelpCircle, title: 'FAQ', description: 'Jawaban atas pertanyaan umum seputar layanan teknologi, akun, dan penggunaan sistem di lingkungan Yayasan.', link: '/dukungan/faq' },
            { icon: Settings, title: 'Ajukan Bantuan', description: 'Formulir permintaan bantuan teknis.', link: '/dukungan/kontak' }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title}>
                <Link to={item.link} className="block group h-full">
                  <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl h-full transform hover:-translate-y-2 transition-all duration-300 text-center overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to right, #002874, #54C0DA)' }}></div>
                    <div className="relative z-10 flex flex-col items-center h-full">
                      <div className="bg-indigo-100 group-hover:bg-white/20 p-5 rounded-full mb-6 transition-colors duration-300">
                        <Icon size={32} className="text-indigo-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-2xl font-bold text-blue-900 mb-2 group-hover:text-white transition-colors duration-300">{item.title}</h3>
                      <p className="text-slate-600 group-hover:text-gray-200 flex-grow transition-colors duration-300">{item.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default HomePage;