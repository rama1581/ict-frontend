import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import apiClient from './services/api';

// Impor komponen Layout dan Halaman
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import LayananPage from './pages/LayananPage';
import JaringanPage from './pages/JaringanPage';
import EmailPage from './pages/EmailPage';
import SoftwarePage from './pages/SoftwarePage';
import BantuanPage from './pages/BantuanPage';
import PanduanPage from './pages/PanduanPage';
import DukunganPage from './pages/DukunganPage';
import FaqPage from './pages/FaqPage';
import KontakPage from './pages/KontakPage';
import TentangPage from './pages/TentangPage';
import ServiceStatusPage from './pages/ServiceStatusPage';
import StatusPengajuan from './pages/StatusPengajuan';

function App() {
  useEffect(() => {
    apiClient.get('/sanctum/csrf-cookie').catch(error => {
      console.error('Could not fetch CSRF cookie:', error);
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="pengumuman" element={<NewsPage />} />
        <Route path="news/:slug" element={<NewsDetailPage />} />
        <Route path="layanan" element={<LayananPage />} />
        <Route path="layanan/jaringan" element={<JaringanPage />} />
        <Route path="layanan/email" element={<EmailPage />} />
        <Route path="layanan/software" element={<SoftwarePage />} />
        <Route path="layanan/bantuan" element={<BantuanPage />} />
        <Route path="panduan" element={<PanduanPage />} />
        <Route path="dukungan" element={<DukunganPage />} />
        <Route path="dukungan/faq" element={<FaqPage />} />
        <Route path="dukungan/kontak" element={<KontakPage />} />
        <Route path="tentang" element={<TentangPage />} />
        <Route path="status-layanan" element={<ServiceStatusPage />} />
        <Route path="status-pengajuan" element={<StatusPengajuan />} />
      </Route>
    </Routes>
  );
}

export default App;
