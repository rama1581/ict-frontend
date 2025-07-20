import React, { useEffect } from 'react'; // 1. Import useEffect
import { Link } from 'react-router-dom';

const JaringanPage = () => {
  // 2. Tambahkan blok useEffect untuk mengatur judul tab
  useEffect(() => {
    document.title = 'Jaringan & Internet - ICT Taruna Bakti';
  }, []); // Array kosong berarti efek ini hanya berjalan sekali saat halaman dimuat

  return (
    // 3. Hapus React Fragment (<>) dan komponen <Helmet>
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose lg:prose-xl max-w-none">
          <Link to="/layanan" className="text-indigo-600 hover:underline no-underline mb-8 inline-block">
            &larr; Kembali ke semua layanan
          </Link>
          
          <h1>Panduan Jaringan & Internet</h1>
          <p>
            Kami menyediakan akses internet berkecepatan tinggi di seluruh lingkungan sekolah melalui jaringan WiFi yang aman dan handal. Halaman ini berisi informasi dan panduan untuk terhubung dan memanfaatkan fasilitas jaringan secara maksimal.
          </p>
          
          <h2>Cara Terhubung ke WiFi</h2>
          <ul>
            <li><strong>TarunaBakti-Student</strong>: Diperuntukkan bagi seluruh siswa Taruna Bakti.</li>
            <li><strong>TarunaBakti-Staff</strong>: Jaringan khusus untuk guru dan staf.</li>
          </ul>
          <p>
            Untuk login, gunakan username dan password dari akun email sekolah Anda. Jika Anda mengalami kesulitan, silakan hubungi tim support ICT.
          </p>

          <h2>Kebijakan Penggunaan</h2>
          <p>
            Harap gunakan fasilitas internet dengan bijak dan bertanggung jawab. Dilarang mengakses konten ilegal, menyebarkan informasi palsu, atau melakukan aktivitas yang melanggar hukum dan peraturan sekolah.
          </p>
        </article>
      </div>
    </div>
  );
};

export default JaringanPage;