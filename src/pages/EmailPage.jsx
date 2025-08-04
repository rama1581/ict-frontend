import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Key,
  Briefcase,
  Users,
  Wifi 
} from 'lucide-react';

// Data untuk unit ERP agar lebih mudah dikelola
const erpUnits = [
  { name: 'TK', logo: '/logoerptk.png', link: 'https://apps-tk.tarunabakti.sch.id/ytb/', hoverColor: '#A2C294' },
  { name: 'SD', logo: '/logoerpsd.png', link: 'https://apps-sd.tarunabakti.sch.id/ytb/', hoverColor: '#8C0200' },
  { name: 'SMP', logo: '/logoerpsmp.png', link: 'https://apps-smp.tarunabakti.sch.id/ytb/', hoverColor: '#003249' },
  { name: 'SMA', logo: '/logoerpsma.png', link: 'https://apps-sma.tarunabakti.sch.id/ytb/', hoverColor: '#5B7075' },
  { name: 'Kampus', logo: '/logoerptbu.png', link: 'https://apps.asmtb.ac.id/ytb/', hoverColor: '#06529E' }
];

const EmailPage = () => {
  useEffect(() => {
    document.title = 'Email & Akun - ICT Taruna Bakti';
  }, []);

  return (
    <div className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">

          <div className="mb-8">
            <Link 
              to="/layanan" 
              className="inline-flex items-center gap-2 text-white font-semibold text-sm transition-all duration-300 no-underline px-4 py-2 rounded-full shadow hover:shadow-lg hover:brightness-110"
              style={{
                background: 'linear-gradient(to right, #002874, #54C0DA)'
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Semua Layanan</span>
            </Link>
          </div>
          
          <div className="text-left mb-12">
            <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl tracking-tight">
              Layanan Email & Akun
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl">
              Civitas memiliki pemahaman yang baik dalam mengelola akun dan email institusi secara profesional untuk keperluan akademik dan komunikasi resmi.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-3">
                <Briefcase className="text-indigo-500 w-6 h-6" />
                <span>Akses Platform Digital Anda</span>
              </h2>
              <p className="text-slate-600 mb-6">
                Gunakan akun Taruna Bakti Anda untuk masuk ke platform utama kami.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="block p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-4 mb-3">
                    <Briefcase className="text-blue-500 w-8 h-8 flex-shrink-0" />
                    <h3 className="font-bold text-gray-800 text-lg">Portal ERP Taruna Bakti</h3>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">
                    Portal utama untuk mengelola data akademik, nilai, administrasi, dan informasi penting lainnya.
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Akses portal sesuai dengan unit pendidikan Anda:</p>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 text-center">
                      {erpUnits.map((unit) => (
                        <a 
                          key={unit.name}
                          href={unit.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:bg-[var(--hover-bg)]"
                          style={{ '--hover-bg': unit.hoverColor }}
                        >
                          <img src={unit.logo} alt={`Logo ${unit.name}`} className="h-12 w-12 object-contain mb-2" />
                          <span className="font-semibold text-sm text-gray-700 group-hover:text-white transition-colors duration-200">{unit.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="block p-6 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-4 mb-3">
                      <Users className="text-green-500 w-8 h-8 flex-shrink-0" />
                      <h3 className="font-bold text-gray-800 text-lg">Classroom Taruna Bakti</h3>
                    </div>
                    <p className="text-slate-600 text-sm">
                      Platform pembelajaran digital untuk mendukung proses belajar mengajar. Akses dengan akun ERP untuk mengelola materi, tugas, dan diskusi kelas.
                    </p>
                  </div>

                  <div className="block p-6 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-4 mb-3">
                      <Wifi className="text-orange-500 w-8 h-8 flex-shrink-0" />
                      <h3 className="font-bold text-gray-800 text-lg">TarbakHotspot</h3>
                    </div>
                    <p className="text-slate-600 text-sm">
                      Gunakan akun ERP (NIS untuk siswa, NIP untuk guru/staf) untuk login ke jaringan WiFi sekolah setelah terhubung ke "TarbakHotspot".
                    </p>
                  </div>
                </div>
                
              </div>
            </div>

            {/* ================================================================== */}
            {/* ================= LUPA PASSWORD (DIUBAH) ======================= */}
            {/* ================================================================== */}
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-3">
                <Key className="text-yellow-500 w-6 h-6" />
                <span>Lupa Password</span>
              </h2>
              <p className="text-slate-600 mb-3">
                Jika mengalami kendala login atau lupa kata sandi, ikuti langkah berikut:
              </p>
              {/* Kelas 'list-decimal' diubah menjadi 'list-disc' */}
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li>Gunakan fitur “Lupa Password” yang tersedia di halaman login Google atau portal ERP.</li>
                <li>Jika masalah masih berlanjut, silakan hubungi Tim ICT Support Taruna Bakti untuk bantuan lebih lanjut.</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmailPage;