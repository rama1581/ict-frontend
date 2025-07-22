import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaClock, FaPaperPlane } from 'react-icons/fa';

const BantuanPage = () => {
  useEffect(() => {
    document.title = 'Bantuan Teknis - ICT Taruna Bakti';
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
              Bantuan Teknis
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl">
              Tim ICT Support siap membantu Anda jika mengalami kendala teknis terkait layanan yang kami sediakan.
            </p>
          </div>

          {/* Konten Utama */}
          <div className="bg-white p-8 rounded-2xl shadow-lg space-y-10">
            {/* Bagian Jam Operasional */}
            <div className="flex items-start gap-6">
              <div className="bg-green-100 p-4 rounded-full">
                <FaClock size={28} className="text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Jam Operasional</h2>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  <li><strong>Senin - Jumat:</strong> 07:00 - 16:00 WIB</li>
                  <li><strong>Sabtu:</strong> 08:00 - 12:00 WIB (Hanya melalui email)</li>
                </ul>
              </div>
            </div>

            {/* Garis Pemisah */}
            <hr />

            {/* Bagian Cara Menghubungi */}
            <div className="flex items-start gap-6">
              <div className="bg-sky-100 p-4 rounded-full">
                <FaPaperPlane size={28} className="text-sky-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Cara Menghubungi</h2>
                <p className="text-slate-600">
                  Untuk respons tercepat, silakan datang langsung ke ruang ICT. Anda juga bisa mengirimkan email ke <a href="mailto:icttarunabakti@tarunabakti.or.id" className="text-indigo-600 font-semibold hover:underline">icttarunabakti@tarunabakti.or.id</a> dengan menyertakan detail masalah yang Anda hadapi.
                </p>
                 <Link to="/dukungan/kontak" className="mt-6 inline-block px-6 py-3 bg-blue-800 hover:bg-blue-900 rounded-full text-white font-semibold shadow-md transition-transform duration-300 hover:scale-105">
                    Gunakan Form Pengajuan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BantuanPage;