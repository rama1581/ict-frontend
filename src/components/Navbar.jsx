import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Menggunakan ikon untuk hamburger

const Navbar = () => {
  // State untuk melacak status menu mobile (terbuka/tertutup)
  const [isOpen, setIsOpen] = useState(false);

  // Style untuk link yang sedang aktif
  const activeLinkStyle = {
    color: '#000000',
    fontWeight: '600',
  };

  // Daftar link untuk menghindari penulisan berulang
  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/faq', text: 'FAQ' },
    { to: '/panduan', text: 'Panduan User' },
    { to: '/news', text: 'News' },
    { to: '/kalender', text: 'Kalender Akademik' },
    { to: '/kontak', text: 'Contact Person' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Bagian Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img 
                className="h-14 w-auto" 
                src="/logo-yayasan.png"
                alt="Yayasan Taruna Bakti Logo" 
              />
            </Link>
          </div>

          {/* Menu untuk Desktop (tersembunyi di mobile) */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="text-lg font-medium text-blue-900 hover:text-black transition-colors"
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              >
                {link.text}
              </NavLink>
            ))}
          </div>

          {/* Tombol Hamburger (hanya muncul di mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-blue-900 hover:text-black focus:outline-none"
            >
              {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-gray-100"
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                onClick={() => setIsOpen(false)} // Menutup menu setelah link diklik
              >
                {link.text}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;