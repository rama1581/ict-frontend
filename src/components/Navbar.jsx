import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLogoHovered, setLogoHovered] = useState(false);

  const activeLinkStyle = {
    color: '#000000',
    fontWeight: '600',
  };

  // Spesifikasi transisi dari Figma
  const smartAnimate = {
    duration: 0.3,   // 300ms
    ease: "easeOut" // Kurva Ease Out
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* ================================================================== */}
          {/* ======================= LOGO (DIPERBAIKI) ======================== */}
          {/* ================================================================== */}
          <div className="flex-shrink-0">
            <Link 
              to="/"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
              // Container dibuat relatif & overflow-hidden untuk efek slide
              className="relative block overflow-hidden"
            >
              {/* Logo 2 (Default) - Sekarang ikut beranimasi (fade out) */}
              <motion.img
                className="h-14 w-auto"
                src="/logo2.png"
                alt="Yayasan Taruna Bakti Logo"
                animate={{ opacity: isLogoHovered ? 0 : 1 }} // Menghilang saat di-hover
                transition={smartAnimate}
              />
              {/* Logo 1 (Hover) - Tetap bergeser dari kiri */}
              <motion.img
                className="absolute top-0 left-0 h-14 w-auto"
                src="/logo1.png"
                alt="Yayasan Taruna Bakti Logo Hover"
                initial={{ x: "-100%" }}
                animate={{ x: isLogoHovered ? "0%" : "-100%" }}
                transition={smartAnimate}
              />
            </Link>
          </div>

          {/* Menu Desktop dengan Dropdown */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className="text-lg font-medium text-blue-900 hover:text-black transition-colors" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>
              Beranda
            </NavLink>

            <div className="relative group">
              <NavLink 
                to="/layanan" 
                className="flex items-center gap-2 text-lg font-medium text-blue-900 group-hover:text-black transition-colors focus:outline-none"
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              >
                Layanan <FaChevronDown size={12} />
              </NavLink>
              <div className="absolute top-full pt-2 w-56 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white shadow-lg rounded-md py-2">
                  <Link to="/layanan/jaringan" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">Jaringan & Internet</Link>
                  <Link to="/layanan/email" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">Email & Akun</Link>
                  <Link to="/layanan/software" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">Akademik</Link>
                  <Link to="/layanan/bantuan" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">Bantuan Teknis</Link>
                </div>
              </div>
            </div>
            
            <NavLink to="/panduan" className="text-lg font-medium text-blue-900 hover:text-black transition-colors" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>
              Panduan
            </NavLink>

            <div className="relative group">
              <NavLink
                to="/dukungan"
                className="flex items-center gap-2 text-lg font-medium text-blue-900 group-hover:text-black transition-colors focus:outline-none"
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              >
                Dukungan <FaChevronDown size={12} />
              </NavLink>
              <div className="absolute top-full pt-2 w-56 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white shadow-lg rounded-md py-2">
                  <Link to="/dukungan/kontak" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">Pengajuan Layanan</Link>
                  <Link to="/dukungan/faq" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">FAQ</Link>
                  <Link to="/dukungan/status-layanan" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">Status Layanan</Link>
                  <Link to="/dukungan/status-pengajuan" className="block px-4 py-2 text-blue-900 hover:bg-gray-100">Status Pengajuan</Link>
                </div>
              </div>
            </div>

            <NavLink to="/berita" className="text-lg font-medium text-blue-900 hover:text-black transition-colors" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>
              Berita
            </NavLink>
          </div>

          {/* Tombol Hamburger */}
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
            <NavLink to="/layanan/software" className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Akademik</NavLink>
            <NavLink to="/layanan/bantuan" className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Bantuan Teknis</NavLink>
            <h3 className="px-3 pt-4 pb-2 text-sm font-semibold text-gray-500">Dukungan</h3>
            <NavLink to="/dukungan/kontak" className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Pengajuan Layanan</NavLink>
            <NavLink to="/dukungan/faq" className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>FAQ</NavLink>
            <NavLink to="/dukungan/status-layanan" className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Status Layanan</NavLink>
            <NavLink to="/dukungan/status-pengajuan" className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Status Pengajuan</NavLink>
            <div className="border-t border-gray-200 my-2"></div>
            <NavLink to="/panduan" className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Panduan</NavLink>
            <NavLink to="/pengumuman" className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Pengumuman</NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;