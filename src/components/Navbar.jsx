import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  // State sekarang hanya untuk menu mobile, lebih simpel
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeLinkStyle = {
    color: '#000000',
    fontWeight: '600',
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          <div className="flex-shrink-0">
            <Link to="/">
              <img 
                className="h-14 w-auto" 
                src="/logo-yayasan.png"
                alt="Yayasan Taruna Bakti Logo" 
              />
            </Link>
          </div>

          {/* Menu Desktop dengan Dropdown */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className="text-lg font-medium text-blue-900 hover:text-black transition-colors" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>
              Beranda
            </NavLink>

            {/* Dropdown Layanan menggunakan 'group' */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-lg font-medium text-blue-900 group-hover:text-black transition-colors focus:outline-none">
                Layanan <FaChevronDown size={12} />
              </button>
              {/* Dropdown menu akan muncul saat 'group' di-hover */}
              <div className="absolute top-full pt-2 w-56 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white shadow-lg rounded-md py-2">
                  <Link to="/layanan/jaringan" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">Jaringan & Internet</Link>
                  <Link to="/layanan/email" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">Email & Akun</Link>
                </div>
              </div>
            </div>
            
            <NavLink to="/panduan" className="text-lg font-medium text-blue-900 hover:text-black transition-colors" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>
              Panduan
            </NavLink>

            {/* Dropdown Dukungan menggunakan 'group' */}
            <div className="relative group">
               <button className="flex items-center gap-2 text-lg font-medium text-blue-900 group-hover:text-black transition-colors focus:outline-none">
                Dukungan <FaChevronDown size={12} />
              </button>
              <div className="absolute top-full pt-2 w-56 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white shadow-lg rounded-md py-2">
                  <Link to="/dukungan/kontak" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">Hubungi Kami</Link>
                  <Link to="/dukungan/faq" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">FAQ</Link>
                </div>
              </div>
            </div>

            <NavLink to="/news" className="text-lg font-medium text-blue-900 hover:text-black transition-colors" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>
              Berita
            </NavLink>
          </div>

          {/* Tombol Hamburger (tidak ada perubahan) */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-blue-900 hover:text-black focus:outline-none"
            >
              {isMobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Mobile Dropdown (tidak ada perubahan) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Beranda</NavLink>
            <h3 className="px-3 pt-4 pb-2 text-sm font-semibold text-gray-500">Layanan</h3>
            <NavLink to="/layanan/jaringan" className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Jaringan & Internet</NavLink>
            <NavLink to="/layanan/email" className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Email & Akun</NavLink>
            <h3 className="px-3 pt-4 pb-2 text-sm font-semibold text-gray-500">Dukungan</h3>
            <NavLink to="/dukungan/kontak" className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Hubungi Kami</NavLink>
            <NavLink to="/dukungan/faq" className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>FAQ</NavLink>
            <div className="border-t border-gray-200 my-2"></div>
            <NavLink to="/panduan" className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Panduan</NavLink>
            <NavLink to="/news" className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Berita</NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;