import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaEnvelope } from 'react-icons/fa';

const DukunganPage = () => {
  useEffect(() => {
    document.title = 'Dukungan - ICT Taruna Bakti';
  }, []);

  return (
    <div className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl tracking-tight">
            Pusat Dukungan
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Butuh bantuan? Temukan jawaban atau hubungi tim kami langsung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Kartu ke Halaman FAQ */}
          <Link to="/dukungan/faq" className="block group">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-indigo-200 h-full transform hover:-translate-y-2 transition-all duration-300 text-center">
              <FaQuestionCircle size={40} className="text-indigo-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-blue-900 mb-2">
                FAQ
              </h3>
              <p className="text-slate-600">
                Temukan jawaban dari pertanyaan yang sering diajukan oleh pengguna lain.
              </p>
            </div>
          </Link>

          {/* Kartu ke Halaman Kontak */}
          <Link to="/dukungan/kontak" className="block group">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-indigo-200 h-full transform hover:-translate-y-2 transition-all duration-300 text-center">
              <FaEnvelope size={40} className="text-indigo-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-blue-900 mb-2">
                Hubungi Kami
              </h3>
              <p className="text-slate-600">
                Kirimkan pesan kepada tim kami jika Anda memerlukan bantuan lebih lanjut.
              </p>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default DukunganPage;