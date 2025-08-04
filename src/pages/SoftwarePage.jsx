import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaMicrosoft, FaPaintBrush } from 'react-icons/fa';

const SoftwarePage = () => {
  useEffect(() => {
    document.title = 'Software & Aplikasi - ICT Taruna Bakti';
  }, []);

  return (
    <div className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="max-w-4xl mx-auto">
          {/* ================================================================== */}
          {/* ================ TOMBOL KEMBALI (DIUBAH) ======================= */}
          {/* ================================================================== */}
          <div className="mb-8">
            <Link 
              to="/layanan" 
              className="inline-flex items-center gap-2 text-white font-semibold text-sm transition-all duration-300 no-underline px-4 py-2 rounded-full shadow hover:shadow-lg hover:brightness-110"
              style={{
                background: 'linear-gradient(to right, #002874, #54C0DA)'
              }}
            >
              <FaArrowLeft />
              <span>Kembali ke Semua Layanan</span>
            </Link>
          </div>
          
          {/* Header Halaman */}
          <div className="text-left mb-12">
            <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl tracking-tight">
              Software & Aplikasi
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl">
              Dapatkan akses ke berbagai perangkat lunak berlisensi untuk mendukung proses pembelajaran Anda.
            </p>
          </div>

          {/* Konten Utama */}
          <div className="bg-white p-8 rounded-2xl shadow-lg space-y-10">
            {/* Bagian Microsoft */}
            <div className="flex items-start gap-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <FaMicrosoft size={28} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Microsoft Office 365</h2>
                <p className="text-slate-600">
                  Semua siswa dan staf berhak mendapatkan lisensi Microsoft Office 365 yang mencakup Word, Excel, PowerPoint, OneDrive, dan aplikasi lainnya. Silakan gunakan akun email sekolah Anda untuk login dan aktivasi.
                </p>
              </div>
            </div>

            {/* Garis Pemisah */}
            <hr />

            {/* Bagian Aplikasi Desain */}
            <div className="flex items-start gap-6">
              <div className="bg-purple-100 p-4 rounded-full">
                <FaPaintBrush size={28} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Aplikasi Desain</h2>
                <p className="text-slate-600">
                  Kami juga menyediakan akses ke beberapa aplikasi desain grafis di laboratorium komputer. Untuk penggunaan di luar lab, silakan ajukan permohonan melalui <Link to="/dukungan/kontak" className="text-indigo-600 font-semibold hover:underline">formulir yang tersedia</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwarePage;