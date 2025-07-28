import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  GraduationCap,
  User,
  ShieldCheck
} from 'lucide-react';

const JaringanPage = () => {
  useEffect(() => {
    document.title = 'Jaringan & Internet - ICT Taruna Bakti';
  }, []);

  return (
    <div className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="text-left mb-12">
          <Link 
            to="/layanan" 
            className="inline-flex items-center gap-2 text-indigo-700 hover:text-indigo-900 font-semibold text-sm mb-6 transition-colors no-underline bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-full"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Semua Layanan</span>
          </Link>
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl tracking-tight">
            Jaringan & Internet
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl">
            Panduan lengkap untuk terhubung dan menggunakan fasilitas internet di lingkungan Yayasan Taruna Bakti.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Konten Utama (kiri) */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-lg space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Cara Terhubung ke WiFi</h2>
                <p className="text-slate-600 mb-4">Pilih jaringan WiFi yang sesuai dengan status Anda dan login menggunakan akun email sekolah.</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                    <GraduationCap size={24} className="text-indigo-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">TarunaBakti-Student</h3>
                      <p className="text-sm text-slate-500">Jaringan khusus untuk siswa.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                    <User size={24} className="text-indigo-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">TarunaBakti-Staff</h3>
                      <p className="text-sm text-slate-500">Jaringan khusus untuk guru dan staf.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Kebijakan Penggunaan</h2>
                <p className="text-slate-600">
                  Harap gunakan fasilitas internet dengan bijak dan bertanggung jawab. Dilarang mengakses konten ilegal, menyebarkan informasi palsu, atau melakukan aktivitas yang melanggar hukum dan peraturan sekolah. Pelanggaran terhadap kebijakan ini dapat mengakibatkan penangguhan akses.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar (kanan) */}
          <aside className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Butuh Bantuan?</h3>
              <p className="text-slate-600 mb-4 text-sm">Jika Anda mengalami kesulitan terhubung, coba langkah berikut atau hubungi kami.</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-500">
                <li>Pastikan password Anda benar.</li>
                <li>Coba lupakan jaringan (forget network) lalu sambungkan ulang.</li>
                <li>Restart perangkat Anda.</li>
              </ul>
              <Link to="/dukungan/kontak" className="mt-6 inline-block w-full text-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-semibold shadow-md transition-transform duration-300 hover:scale-105">
                Hubungi Support
              </Link>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
};

export default JaringanPage;
