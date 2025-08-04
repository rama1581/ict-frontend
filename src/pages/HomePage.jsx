import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Network, MailOpen, AppWindow, LifeBuoy, HelpCircle, Settings,
  Activity, Search, Newspaper, Server, BookOpen, MessageSquare, Megaphone
} from 'lucide-react';

// Impor komponen BackgroundSlideshow yang sudah dinamis
import BackgroundSlideshow from '../components/BackgroundSlideshow';

// Peta Ikon untuk menerjemahkan data string dari API menjadi komponen React
const iconMap = {
  Network, MailOpen, AppWindow, LifeBuoy,
  HelpCircle, Settings, Activity
};

// Custom hook untuk debounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => { setDebouncedValue(value); }, delay);
    return () => { clearTimeout(handler); };
  }, [value, delay]);
  return debouncedValue;
}

// Fungsi helper
function decodeHtmlEntities(str) {
  if (!str) return '';
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

function formatDate(dateString) {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Komponen Utama Halaman Beranda
function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const searchRef = useRef(null);

  // Mengambil semua data dinamis untuk halaman dari backend dengan sistem cache
  const { data: pageData, isLoading: isLoadingPage } = useQuery({
    queryKey: ['homePageData'],
    queryFn: async () => {
      const [heroRes, servicesRes, supportRes] = await Promise.all([
        apiClient.get('/api/page-content/home'),
        apiClient.get('/api/services'),
        apiClient.get('/api/support-links'),
      ]);
      return {
        hero: heroRes.data,
        services: servicesRes.data,
        supportLinks: supportRes.data,
      };
    },
  });

  // Mengambil data berita secara terpisah
  const { data: allNews = [] } = useQuery({
    queryKey: ['allNews'],
    queryFn: async () => {
      const response = await apiClient.get('/api/news');
      return response.data.data;
    },
  });

  // Logika untuk pencarian
  useEffect(() => {
    const performSearch = () => {
      if (!pageData || !allNews) return; // Pastikan data sudah ada
      
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
      
      const servicesResults = pageData.services?.items
        .filter(service => service.title.toLowerCase().includes(query))
        .map(service => ({ type: 'Layanan', title: service.title, link: service.link, icon: <Server size={20} className="text-gray-400" /> }));

      // Anda bisa menambahkan data lain untuk dicari di sini
      
      setSearchResults([...newsResults, ...servicesResults]);
      setIsSearching(false);
    };
    performSearch();
  }, [debouncedSearchTerm, allNews, pageData]);

  // Logika untuk menutup dropdown pencarian
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

  if (isLoadingPage) {
    return <div className="flex justify-center items-center h-screen">Memuat data halaman...</div>;
  }

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
            <h1 className="text-3xl md:text-4xl font-extrabold"
              dangerouslySetInnerHTML={{ __html: pageData?.hero?.title || "Selamat Datang di Layanan IT <br /> <span class='text-white'>Yayasan Taruna Bakti</span>" }}
            />
            <p className="max-w-md text-blue-100">
              {pageData?.hero?.description || "Layanan ini hadir untuk mendukung seluruh civitas akademika dalam pemanfaatan teknologi informasi secara efektif, aman, dan terintegrasi."}
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
                  placeholder="Cari berita atau layanan..."
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
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-lg overflow-hidden z-30">
                    {isSearching ? (<div className="p-4 text-center text-gray-500">Mencari...</div>) 
                    : searchResults.length > 0 ? (
                      <ul className="max-h-80 overflow-y-auto">
                        {searchResults.map((result, index) => (
                          <li key={index}>
                            <Link to={result.link} onClick={() => setSearchTerm('')} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-100 transition-colors">
                              {result.icon}
                              <div>
                                <p className="font-semibold text-gray-800">{result.title}</p>
                                <p className="text-xs text-gray-500">{result.type}</p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (<div className="p-4 text-center text-gray-500">Hasil tidak ditemukan.</div>)}
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
          <motion.h2 className="text-3xl md:text-4xl font-bold text-blue-900">{pageData?.services?.title || "Layanan Yang Tersedia"}</motion.h2>
          <motion.p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            {pageData?.services?.description || "Layanan teknologi informasi yang dapat diakses oleh seluruh civitas Yayasan Taruna Bakti."}
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {pageData?.services?.items?.map((item) => {
             const Icon = iconMap[item.icon] || Network;
             return (
              <motion.div key={item.title}>
                <Link to={item.link} className="block group h-full">
                  <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl h-full overflow-hidden transition-all duration-300">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to right, #002874, #54C0DA)' }}/>
                    <div className="relative z-10">
                      <div className="mb-6 bg-indigo-100 group-hover:bg-white/20 p-4 rounded-full inline-block transition-colors duration-300">
                        <Icon size={36} className="text-indigo-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-white transition-colors duration-300">{item.title}</h3>
                      <p className="text-slate-600 group-hover:text-gray-200 transition-colors duration-300">{item.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
             );
          })}
        </div>
      </section>

      {/* Bagian Berita */}
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
          <motion.h2 className="text-3xl md:text-4xl font-bold text-blue-900">{pageData?.supportLinks?.title || "Pusat Dukungan & Bantuan"}</motion.h2>
          <motion.p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
             {pageData?.supportLinks?.description || "Temukan informasi status layanan terkini, pertanyaan yang sering diajukan (FAQ), dan ajukan permintaan layanan atau bantuan teknis dengan mudah."}
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pageData?.supportLinks?.items?.map((item) => {
            const Icon = iconMap[item.icon] || HelpCircle;
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