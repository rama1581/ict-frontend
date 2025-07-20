import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa';

// Data untuk daftar panduan (nantinya bisa diambil dari API)
const guides = [
  { id: 1, title: 'Cara Menghubungkan ke Jaringan WiFi Kampus', link: '/panduan/wifi' },
  { id: 2, title: 'Panduan Reset Password Email Taruna Bakti', link: '/panduan/reset-password' },
  { id: 3, title: 'Instalasi dan Aktivasi Microsoft Office 365', link: '/panduan/office-365' },
  { id: 4, title: 'Menggunakan Sistem Informasi Akademik', link: '/panduan/siakad' },
];

const PanduanPage = () => {
  // Menambahkan useEffect untuk mengatur judul tab
  useEffect(() => {
    document.title = 'Panduan - ICT Taruna Bakti';
  }, []);

  return (
    // Menghapus <Helmet> dan React Fragment (<>)
    <div className="bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl">
            Pusat Panduan
          </h1>
          <p className="mt-4 text-xl text-slate-600">
            Temukan panduan dan tutorial untuk menggunakan layanan ICT kami.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-4">
          {guides.map((guide) => (
            <Link key={guide.id} to={guide.link} className="block group">
              <div className="p-4 border-b border-gray-200 hover:bg-slate-50 rounded-lg transition-colors duration-300">
                <div className="flex items-center gap-4">
                  <FaFileAlt className="text-indigo-500 flex-shrink-0" size={24} />
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600">
                    {guide.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PanduanPage;