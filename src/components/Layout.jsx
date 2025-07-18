import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    // 1. Jadikan pembungkus utama sebagai flex-col setinggi layar
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* 2. <main> akan otomatis mengisi ruang kosong di antara Navbar dan Footer */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;