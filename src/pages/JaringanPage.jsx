import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  GraduationCap,
  User,
  Wifi // Mengganti ikon menjadi lebih relevan
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
            className="inline-flex items-center gap-2 text-white font-semibold text-sm mb-6 transition-all duration-300 no-underline px-4 py-2 rounded-full shadow hover:shadow-lg hover:brightness-110"
            style={{
              background: 'linear-gradient(to right, #002874, #54C0DA)'
            }}
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
          {/* ================================================================== */}
          {/* ==================== KONTEN UTAMA (DIUBAH) ===================== */}
          {/* ================================================================== */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-lg space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Cara Terhubung ke WiFi</h2>
                <p className="text-slate-600 mb-6">
                  Seluruh area sekolah dijangkau oleh satu jaringan WiFi utama. Setelah terhubung, Anda akan otomatis diarahkan ke halaman login untuk autentikasi.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <Wifi size={28} className="text-indigo-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">Nama Jaringan: TarbakHotspot</h3>
                      <p className="text-sm text-slate-500 mt-2">
                        <strong>Langkah-langkah:</strong>
                      </p>
                      <ol className="list-decimal list-inside text-sm text-slate-500 space-y-1 mt-1">
                        <li>Pilih jaringan WiFi <strong>"TarbakHotspot"</strong> pada perangkat Anda.</li>
                        <li>Buka browser, dan Anda akan otomatis diarahkan ke halaman login.</li>
                        <li>Login menggunakan akun ERP Anda:
                            <ul className="list-disc list-inside ml-4 mt-1">
                                <li><strong>Siswa:</strong> Gunakan Nomor Induk Siswa (NIS).</li>
                                <li><strong>Guru & Staf:</strong> Gunakan Nomor Induk Pegawai (NIP).</li>
                            </ul>
                        </li>
                        <li>Setelah berhasil, Anda akan terhubung ke internet.</li>
                      </ol>
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
              <p className="text-slate-600 mb-4 text-sm">Jika Anda mengalami kesulitan terhubung atau login, coba langkah berikut:</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-500">
                <li>Pastikan NIP/NIS dan password Anda benar.</li>
                <li>Coba lupakan jaringan (forget network) lalu sambungkan ulang.</li>
                <li>Restart perangkat Anda.</li>
              </ul>
              <Link
                to="/dukungan/kontak"
                className="mt-6 inline-block w-full text-center px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:brightness-110"
                style={{
                  background: 'linear-gradient(to right, #002874, #54C0DA)'
                }}
              >
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