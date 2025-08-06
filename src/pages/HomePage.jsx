import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom'; // NavLink mungkin tidak digunakan di file ini, tapi saya biarkan untuk kelengkapan
import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Network, MailOpen, AppWindow, LifeBuoy, HelpCircle, Settings,
  Activity, Search, Newspaper, Server, BookOpen, MessageSquare, Megaphone, Ticket,
  ChevronLeft, ChevronRight
} from 'lucide-react';

// Impor komponen BackgroundSlideshow
import BackgroundSlideshow from '../components/BackgroundSlideshow';

// Peta Ikon untuk menerjemahkan data dari API
const iconMap = {
  Network, MailOpen, AppWindow, LifeBuoy,
  HelpCircle, Settings, Activity, Ticket
};

// ==================================================================
// ==================== DATA STATIS DIPERBARUI ======================
// ==================================================================

// Data statis untuk halaman utama
const guidesData = [{ title: 'Panduan', link: '/panduan' }];
const announcementsData = [{ title: 'Berita', link: '/berita' }];

// Data statis untuk item navigasi Layanan
const servicesNavData = [
  { title: 'Layanan', link: '/layanan', type: 'Halaman Kategori' },
  { title: 'Jaringan & Internet', link: '/layanan/jaringan', type: 'Layanan' },
  { title: 'Email & Akun', link: '/layanan/email', type: 'Layanan' },
  { title: 'Akademik', link: '/layanan/software', type: 'Layanan' },
  { title: 'Bantuan Teknis', link: '/layanan/bantuan', type: 'Layanan' }
];

// Data statis untuk item navigasi Dukungan
const supportNavData = [
  { title: 'Dukungan', link: '/dukungan', type: 'Halaman Kategori' },
  { title: 'Pengajuan Layanan', link: '/dukungan/kontak', type: 'Dukungan' },
  { title: 'FAQ', link: '/dukungan/faq', type: 'Dukungan' },
  { title: 'Status Layanan', link: '/dukungan/status-layanan', type: 'Dukungan' },
  { title: 'Status Pengajuan', link: '/dukungan/status-pengajuan', type: 'Dukungan' }
];


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
  return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Komponen Skeleton untuk Kartu Layanan & Dukungan
const ServiceCardSkeleton = () => (
  <div className="bg-white p-8 rounded-2xl shadow-lg h-full animate-pulse">
    <div className="mb-6 bg-gray-200 p-4 rounded-full inline-block w-16 h-16"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6 mt-2"></div>
  </div>
);

// Komponen Skeleton untuk Kartu Berita Terbaru
const NewsCardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md h-full overflow-hidden animate-pulse">
        <div className="bg-gray-200 w-full h-56"></div>
        <div className="p-6">
            <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mt-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
        </div>
    </div>
);


// Komponen Slideshow Berita Populer
const PopularNewsSlideshow = ({ popularNews, isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL || 'http://ict-backend.test';

  const nextSlide = () => {
    if (popularNews.length > 1) {
      setCurrentIndex((prevIndex) => (prevIndex === popularNews.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const prevSlide = () => {
    if (popularNews.length > 1) {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? popularNews.length - 1 : prevIndex - 1));
    }
  };
  
  if (isLoading) {
    return (
      <div className="relative w-full h-[60vh] rounded-2xl bg-gray-200 animate-pulse flex items-center justify-center mb-16">
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="bg-gray-300 h-6 w-40 rounded-full mb-4"></div>
          <div className="bg-gray-300 h-10 w-3/4 rounded"></div>
        </div>
      </div>
    );
  }

  if (!popularNews || popularNews.length === 0) {
    return (
        <div className="relative w-full h-[60vh] rounded-2xl bg-slate-100 flex items-center justify-center mb-16">
          <p className="text-slate-500">Tidak ada berita populer saat ini.</p>
        </div>
      );
  }

  return (
    <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden shadow-2xl mb-16">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <Link to={`/news/${popularNews[currentIndex].slug}`} className="block w-full h-full">
            <img
              src={`${API_URL}/storage/${popularNews[currentIndex].thumbnail}`}
              alt={popularNews[currentIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">BERITA POPULER</span>
              <h2 className="text-3xl font-bold drop-shadow-lg">{popularNews[currentIndex].title}</h2>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>

      {popularNews.length > 1 && (
        <>
          <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition z-10">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition z-10">
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};


// Komponen Utama Halaman Beranda
function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const searchRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://ict-backend.test';

  const { data: pageData, isLoading: isLoadingPage } = useQuery({
    queryKey: ['homePageData'],
    queryFn: async () => {
      const [heroRes, servicesRes, supportRes] = await Promise.all([
        apiClient.get('/api/page-content/home'),
        apiClient.get('/api/services'),
        apiClient.get('/api/support-links'),
      ]);
      return { hero: heroRes.data, services: servicesRes.data, supportLinks: supportRes.data };
    },
  });

  const { data: popularNews = [], isLoading: isLoadingPopular } = useQuery({
    queryKey: ['popularNews'],
    queryFn: async () => {
      const response = await apiClient.get('/api/news/popular');
      return response.data?.data || [];
    },
  });

  const { data: latestNews = [], isLoading: isLoadingLatest } = useQuery({
    queryKey: ['latestNews'],
    queryFn: async () => {
      const response = await apiClient.get('/api/news/latest');
      return response.data?.data || [];
    },
  });

  const { data: allNewsForSearch = [] } = useQuery({
    queryKey: ['allNews'],
    queryFn: async () => {
      const response = await apiClient.get('/api/news');
      return response.data?.data || [];
    },
  });

  useEffect(() => {
    const performSearch = () => {
      if (!debouncedSearchTerm) return;

      const query = debouncedSearchTerm.toLowerCase();
      
      if (query.length < 3) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      
      // 1. Cari di Berita (dari API)
      const newsResults = allNewsForSearch
        .filter(news => news.title.toLowerCase().includes(query))
        .map(news => ({ type: 'Berita', title: news.title, link: `/news/${news.slug}`, icon: <Newspaper size={20} className="text-gray-400" /> }));

      // 2. Cari di Kartu Layanan (dari API)
      const servicesCardResults = pageData?.services?.items
        ?.filter(s => s.title.toLowerCase().includes(query))
        .map(s => ({ type: 'Layanan', title: s.title, link: s.link, icon: <Server size={20} className="text-gray-400" /> })) || [];

      // 3. Cari di Kartu Dukungan (dari API)
      const supportCardResults = pageData?.supportLinks?.items
        ?.filter(i => i.title.toLowerCase().includes(query))
        .map(i => ({ type: 'Dukungan', title: i.title, link: i.link, icon: <MessageSquare size={20} className="text-gray-400" /> })) || [];

      // 4. Cari di Navigasi Layanan (statis)
      const servicesNavResults = servicesNavData
        .filter(s => s.title.toLowerCase().includes(query))
        .map(s => ({ type: s.type, title: s.title, link: s.link, icon: <Server size={20} className="text-gray-400" /> }));

      // 5. Cari di Navigasi Dukungan (statis)
      const supportNavResults = supportNavData
        .filter(s => s.title.toLowerCase().includes(query))
        .map(s => ({ type: s.type, title: s.title, link: s.link, icon: <LifeBuoy size={20} className="text-gray-400" /> }));

      // 6. Cari di Halaman Statis (Panduan & Pengumuman)
      const guidesResults = guidesData
        .filter(g => g.title.toLowerCase().includes(query))
        .map(g => ({ type: 'Halaman', title: g.title, link: g.link, icon: <BookOpen size={20} className="text-gray-400" /> }));
        
      const announcementsResults = announcementsData
        .filter(a => a.title.toLowerCase().includes(query))
        .map(a => ({ type: 'Halaman', title: a.title, link: a.link, icon: <Megaphone size={20} className="text-gray-400" /> }));

      // Gabungkan semua hasil
      setSearchResults([
        ...newsResults, 
        ...servicesCardResults, 
        ...supportCardResults, 
        ...servicesNavResults,
        ...supportNavResults,
        ...guidesResults, 
        ...announcementsResults
      ]);
      
      setIsSearching(false);
    };

    performSearch();
  }, [debouncedSearchTerm, allNewsForSearch, pageData]);

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
  
  useEffect(() => {
    document.title = 'Beranda - ICT Taruna Bakti';
  }, []);

  return (
    <main className="w-full">
      <section className="relative overflow-hidden min-h-[80vh] flex items-center" style={{ background: 'linear-gradient(135deg, #002874, #54C0DA)' }}>
        <BackgroundSlideshow />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10" />
        <div className="relative z-20 container mx-auto px-6 md:px-20 py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 space-y-6 text-white">
            <h1 className="text-3xl md:text-4xl font-extrabold" dangerouslySetInnerHTML={{ __html: pageData?.hero?.title || "Selamat Datang di Layanan IT <br /> <span class='text-white'>Yayasan Taruna Bakti</span>" }} />
            <p className="max-w-md text-blue-100">{pageData?.hero?.description || "Layanan ini hadir untuk mendukung seluruh civitas akademika dalam pemanfaatan teknologi informasi secara efektif, aman, dan teintegrasi."}</p>
            <div className="relative max-w-xl" ref={searchRef}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center bg-white rounded-full shadow-lg px-6 py-3 mt-4">
                <input type="text" placeholder="Cari berita, layanan, panduan..." className="flex-grow text-gray-700 focus:outline-none text-base bg-transparent" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button className="flex items-center gap-2 px-6 py-2 rounded-full text-white font-semibold" style={{ background: 'linear-gradient(to right, #002874, #54C0DA)', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'}}>
                  {isSearching ? '...' : 'Cari'} <Search size={18} />
                </button>
              </motion.div>
              <AnimatePresence>
                {searchTerm.length >= 3 && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-lg overflow-hidden z-30">
                    {isSearching ? <div className="p-4 text-center text-gray-500">Mencari...</div> : searchResults.length > 0 ? (
                      <ul className="max-h-80 overflow-y-auto">
                        {searchResults.map((result, index) => (
                          <li key={index}><Link to={result.link} onClick={() => setSearchTerm('')} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-100 transition-colors">
                            {result.icon}
                            <div><p className="font-semibold text-gray-800">{result.title}</p><p className="text-xs text-gray-500">{result.type}</p></div>
                          </Link></li>
                        ))}
                      </ul>
                    ) : <div className="p-4 text-center text-gray-500">Hasil tidak ditemukan.</div>}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center"><img src="/logobg.png" alt="Logo" className="w-64 md:w-80 object-contain" /></div>
        </div>
      </section>

      {/* Sisa komponen tetap sama */}
      <section className="py-20 px-4 md:px-20 bg-gray-50">
        <div className="text-center mb-16">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-blue-900">{pageData?.services?.title || "Layanan Yang Tersedia"}</motion.h2>
          <motion.p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">{pageData?.services?.description || "Layanan teknologi informasi..."}</motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {isLoadingPage ? (
            [...Array(4)].map((_, i) => <ServiceCardSkeleton key={i} />)
          ) : (
            pageData?.services?.items?.map((item) => {
                const Icon = iconMap[item.icon] || Network;
                return (
                  <motion.div key={item.title}><Link to={item.link} className="block group h-full"><div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl h-full overflow-hidden transition-all duration-300">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to right, #002874, #54C0DA)' }}/>
                    <div className="relative z-10"><div className="mb-6 bg-indigo-100 group-hover:bg-white/20 p-4 rounded-full inline-block transition-colors duration-300">
                      <Icon size={36} className="text-indigo-600 group-hover:text-white transition-colors duration-300" />
                    </div><h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-white transition-colors duration-300">{item.title}</h3><p className="text-slate-600 group-hover:text-gray-200 transition-colors duration-300">{item.description}</p></div>
                  </div></Link></motion.div>
                );
            })
          )}
        </div>
      </section>

      <section className="py-20 bg-white px-4 md:px-20">
        <div className="text-center mb-8"><motion.h2 className="text-3xl md:text-4xl font-bold text-blue-900">Berita Populer</motion.h2><motion.p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Informasi dan kabar yang paling banyak menarik perhatian.</motion.p></div>
        <PopularNewsSlideshow popularNews={popularNews} isLoading={isLoadingPopular} />
        
        <div className="text-center mb-16 mt-24"><motion.h2 className="text-3xl md:text-4xl font-bold text-blue-900">Berita Terbaru</motion.h2><motion.p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Informasi dan kabar terkini dari lingkungan Yayasan.</motion.p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {isLoadingLatest ? (
            [...Array(3)].map((_, i) => <NewsCardSkeleton key={i} />)
          ) : latestNews.length > 0 ? (
            latestNews.map((news) => (
              <motion.div key={news.id} whileHover={{ y: -8 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="h-full"><Link to={`/news/${news.slug}`} className="block group bg-white rounded-lg shadow-md h-full relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-90 transition-all duration-300" style={{ background: 'linear-gradient(to right, #002874, #54C0DA)' }}></div>
                <div className="relative z-10 h-full flex flex-col"><div className="relative">
                  <img src={`${API_URL}/storage/${news.thumbnail}`} alt={news.title} className="w-full h-56 object-cover"/>
                  <div className="absolute bottom-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow">{formatDate(news.created_at)}</div>
                </div><div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-white transition-colors duration-300">{news.title}</h3>
                  <p className="text-slate-600 group-hover:text-gray-200 transition-colors duration-300 text-sm leading-relaxed">{decodeHtmlEntities(news.content.replace(/<[^>]+>/g, '').slice(0, 120))}...</p>
                </div></div>
              </Link></motion.div>
            ))
          ) : (
            <p className="col-span-3 text-center text-slate-500">Tidak ada berita terbaru.</p>
          )}
        </div>
        <div className="mt-16 text-center">
          <Link to="/berita" className="inline-block px-8 py-3 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:brightness-110" style={{ background: 'linear-gradient(to right, #002874, #54C0DA)' }}>Lihat Semua Berita</Link>
        </div>
      </section>
      
      <section className="py-20 px-4 md:px-20 bg-gray-50">
        <div className="text-center mb-16"><motion.h2 className="text-3xl md:text-4xl font-bold text-blue-900">{pageData?.supportLinks?.title || "Pusat Dukungan & Bantuan"}</motion.h2><motion.p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">{pageData?.supportLinks?.description || "Temukan informasi status layanan terkini..."}</motion.p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {isLoadingPage ? (
            [...Array(2)].map((_, i) => <ServiceCardSkeleton key={i} />)
          ) : (
            pageData?.supportLinks?.items?.map((item) => {
              const Icon = iconMap[item.icon] || HelpCircle;
              return (
                <motion.div key={item.title}><Link to={item.link} className="block group h-full"><div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl h-full overflow-hidden transition-all duration-300">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to right, #002874, #54C0DA)' }}></div>
                  <div className="relative z-10"><div className="mb-6 bg-indigo-100 group-hover:bg-white/20 p-4 rounded-full inline-block transition-colors duration-300">
                    <Icon size={36} className="text-indigo-600 group-hover:text-white transition-colors duration-300" />
                  </div><h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-white transition-colors duration-300">{item.title}</h3><p className="text-slate-600 group-hover:text-gray-200 transition-colors duration-300">{item.description}</p></div>
                </div></Link></motion.div>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}

export default HomePage;