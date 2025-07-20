import { Routes, Route } from 'react-router-dom'

// Impor komponen Layout dan Halaman
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import News from './pages/NewsPage'
import NewsDetailPage from './pages/NewsDetailPage'
import LayananPage from './pages/LayananPage'
import PanduanPage from './pages/PanduanPage'
import FaqPage from './pages/FaqPage'
import KontakPage from './pages/KontakPage'
import JaringanPage from './pages/JaringanPage'
import EmailPage from './pages/EmailPage'
import DukunganPage from './pages/DukunganPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="news" element={<News />} />
        <Route path="news/:slug" element={<NewsDetailPage />} />
        <Route path="layanan" element={<LayananPage />} />
        <Route path="layanan/jaringan" element={<JaringanPage />} />
        <Route path="panduan" element={<PanduanPage />} />
        <Route path="dukungan" element={<DukunganPage />} />
        <Route path="dukungan/faq" element={<FaqPage />} />
        <Route path="dukungan/kontak" element={<KontakPage />} />
        <Route path="layanan/email" element={<EmailPage />} />
      </Route>
    </Routes>
  );
}

export default App