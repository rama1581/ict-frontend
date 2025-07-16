import { Routes, Route } from 'react-router-dom'

// Impor komponen Layout dan Halaman
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import BeritaPage from './pages/BeritaPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Rute untuk Halaman Utama */}
        <Route index element={<HomePage />} />
        
        {/* Rute untuk Halaman Berita */}
        <Route path="berita" element={<BeritaPage />} />
      </Route>
    </Routes>
  )
}

export default App