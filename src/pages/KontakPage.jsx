import React, { useEffect } from 'react';
import { FaInstagram, FaGlobe, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const KontakPage = () => {
  // Menambahkan useEffect untuk mengatur judul tab
  useEffect(() => {
    document.title = 'Hubungi Kami - ICT Taruna Bakti';
  }, []);

  return (
    // Menghapus <Helmet> dan React Fragment (<>)
    <div className="bg-slate-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl">
            Hubungi Kami
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
            Punya pertanyaan, keluhan, atau butuh bantuan? Jangan ragu untuk menghubungi kami melalui form di bawah ini atau detail kontak yang tersedia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Kolom Kiri: Informasi Kontak */}
          <div className="bg-white p-8 rounded-2xl shadow-lg h-full">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Informasi Kontak</h2>
            <div className="space-y-6 text-slate-600">
              {/* Alamat */}
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt size={20} className="text-indigo-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Alamat</h3>
                  <p>Jl. L. L. R.E. Martadinata No.52, Citarum, Bandung</p>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-start gap-4">
                <FaEnvelope size={20} className="text-indigo-500 mt-1 flex-shrink-0" />
                 <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <a href="mailto:icttarunabakti@tarunabakti.or.id" className="hover:text-indigo-600">icttarunabakti@tarunabakti.or.id</a>
                </div>
              </div>
              {/* Instagram */}
              <div className="flex items-start gap-4">
                <FaInstagram size={20} className="text-indigo-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Instagram</h3>
                  <a href="https://www.instagram.com/tarunabakti_id/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">@tarunabakti_id</a>
                </div>
              </div>
               {/* Website */}
              <div className="flex items-start gap-4">
                <FaGlobe size={20} className="text-indigo-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Website Resmi</h3>
                  <a href="https://tarunabakti.or.id" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">tarunabakti.or.id</a>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Form Kontak */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Kirim Pesan Langsung</h2>
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input type="text" name="name" id="name" required className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
                <input type="email" name="email" id="email" required className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
               <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
                <input type="text" name="subject" id="subject" required className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                <textarea name="message" id="message" rows="4" required className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  Kirim Pesan
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default KontakPage;