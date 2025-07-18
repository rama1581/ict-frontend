import { Routes, Route } from 'react-router-dom'

// Impor komponen Layout dan Halaman
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import Post from './pages/PostPage'
import News from './pages/NewsPage'
import NewsDetailPage from './pages/NewsDetailPage'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Rute untuk Halaman Utama */}
        <Route index element={<HomePage />} />
        
        {/* Rute untuk Halaman Berita */}
        <Route path="post" element={<Post />} />
        <Route path="news" element={<News />} />
        <Route path="news/:slug" element={<NewsDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App