import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Send } from 'lucide-react';

const BantuanPage = () => {
  useEffect(() => {
    document.title = 'Bantuan Teknis - ICT Taruna Bakti';
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
              <ArrowLeft size={18} />
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
                <Clock size={28} className="text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Jam Operasional</h2>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  <li><strong>Senin - Jumat:</strong> 07:00 - 16:00 WIB</li>
                  <li><strong>Sabtu:</strong> 08:00 - 12:00 WIB (Hanya melalui email)</li>
                </ul>
              </div>
            </div>

            <hr />

            {/* Bagian Cara Menghubungi */}
            <div className="flex items-start gap-6">
              <div className="bg-sky-100 p-4 rounded-full">
                <Send size={28} className="text-sky-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Cara Menghubungi</h2>
                <p className="text-slate-600">
                  Untuk respons tercepat, silakan datang langsung ke ruang ICT. Anda juga bisa mengirimkan email ke <a href="mailto:icttarunabakti@tarunabakti.or.id" className="text-indigo-600 font-semibold hover:underline">icttarunabakti@tarunabakti.or.id</a> dengan menyertakan detail masalah yang Anda hadapi.
                </p>
                {/* ================================================================== */}
                {/* ============= TOMBOL FORM PENGAJUAN (DIUBAH) =================== */}
                {/* ================================================================== */}
                <Link
                  to="/dukungan/kontak"
                  className="mt-6 inline-block px-6 py-3 rounded-full text-white font-semibold shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:brightness-110"
                  style={{
                    background: 'linear-gradient(to right, #002874, #54C0DA)'
                  }}
                >
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