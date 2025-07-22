import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope, FaGoogle, FaMobileAlt, FaKey } from 'react-icons/fa';

const EmailPage = () => {
  useEffect(() => {
    document.title = 'Email & Akun - ICT Taruna Bakti';
  }, []);

  return (
    <div className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="max-w-4xl mx-auto">
          {/* Tombol Kembali */}
          <div className="mb-8">
            <Link 
              to="/layanan" 
              className="inline-flex items-center gap-2 text-indigo-700 hover:text-indigo-900 font-semibold text-sm mb-6 transition-colors no-underline bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-full"
            >
              <FaArrowLeft />
              <span>Kembali ke Semua Layanan</span>
            </Link>
          </div>
          
          {/* Header Halaman */}
          <div className="text-left mb-12">
            <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl tracking-tight">
              Layanan Email & Akun
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl">
              Akun email resmi `@tarunabakti.or.id` adalah identitas digital Anda untuk semua komunikasi dan akses layanan sekolah.
            </p>
          </div>

          {/* Konten Utama */}
          <div className="bg-white p-8 rounded-2xl shadow-lg space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-3">
                <FaEnvelope className="text-indigo-500" />
                <span>Akses Email Anda</span>
              </h2>
              <p className="text-slate-600 mb-4">
                Akses email Anda melalui portal webmail resmi atau atur di aplikasi pada smartphone.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <FaGoogle size={24} className="text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Webmail (via Google)</h3>
                    <p className="text-sm text-slate-500">Akses melalui <a href="https://mail.google.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-medium hover:underline">mail.google.com</a>.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <FaMobileAlt size={24} className="text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Aplikasi Mobile</h3>
                    <p className="text-sm text-slate-500">Gunakan aplikasi Gmail (Android/iOS) dan tambahkan akun baru.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-3">
                <FaKey className="text-yellow-500" />
                <span>Lupa Password</span>
              </h2>
              <p className="text-slate-600">
                Jika Anda lupa password, Anda dapat menggunakan fitur "Lupa Password" yang tersedia di halaman login Google. Jika Anda mengalami kendala lebih lanjut, silakan hubungi tim support ICT untuk bantuan reset password secara manual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPage;