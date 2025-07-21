import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const SoftwarePage = () => {
  useEffect(() => {
    document.title = 'Software & Aplikasi - ICT Taruna Bakti';
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose lg:prose-xl max-w-none">
          <Link to="/layanan" className="text-indigo-600 hover:underline no-underline mb-8 inline-block">
            &larr; Kembali ke semua layanan
          </Link>
          
          <h1>Software & Aplikasi</h1>
          <p>
            Untuk mendukung proses pembelajaran, ICT Taruna Bakti menyediakan akses ke berbagai perangkat lunak berlisensi yang dapat digunakan oleh seluruh siswa dan staf.
          </p>
          
          <h2>Microsoft Office 365</h2>
          <p>
            Semua siswa dan staf berhak mendapatkan lisensi Microsoft Office 365 yang mencakup Word, Excel, PowerPoint, OneDrive, dan aplikasi lainnya. Silakan gunakan akun email sekolah Anda untuk login dan aktivasi.
          </p>

          <h2>Aplikasi Desain</h2>
          <p>
            Kami juga menyediakan akses ke beberapa aplikasi desain grafis di laboratorium komputer. Untuk penggunaan di luar lab, silakan ajukan permohonan melalui form yang tersedia.
          </p>
        </article>
      </div>
    </div>
  );
};

export default SoftwarePage;