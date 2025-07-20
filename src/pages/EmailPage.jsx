import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const EmailPage = () => {
  // Menambahkan useEffect untuk mengatur judul tab
  useEffect(() => {
    document.title = 'Email & Akun - ICT Taruna Bakti';
  }, []); // Array kosong berarti hanya berjalan sekali saat halaman dimuat

  return (
    // Menghapus <Helmet> dan React Fragment (<>)
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose lg:prose-xl max-w-none">
          <Link to="/layanan" className="text-indigo-600 hover:underline no-underline mb-8 inline-block">
            &larr; Kembali ke semua layanan
          </Link>
          
          <h1>Layanan Email & Akun</h1>
          <p>
            Setiap siswa dan staf di Taruna Bakti akan mendapatkan akun email resmi dengan domain `@tarunabakti.or.id`. Akun ini merupakan identitas digital Anda dan digunakan untuk semua komunikasi resmi serta akses ke berbagai layanan digital sekolah.
          </p>
          
          <h2>Akses Email Anda</h2>
          <p>
            Anda dapat mengakses email melalui portal webmail resmi kami atau mengaturnya di aplikasi email pada smartphone Anda.
          </p>
          <ul>
            <li><strong>Webmail:</strong> Akses melalui <a href="https://mail.google.com/" target="_blank" rel="noopener noreferrer">mail.google.com</a> (karena kami menggunakan Google Workspace).</li>
            <li><strong>Aplikasi Mobile:</strong> Gunakan aplikasi Gmail di Android atau iOS dan tambahkan akun baru.</li>
          </ul>

          <h2>Lupa Password</h2>
          <p>
            Jika Anda lupa password, Anda dapat menggunakan fitur "Lupa Password" yang tersedia di halaman login Google. Jika Anda mengalami kendala lebih lanjut, silakan hubungi tim support ICT untuk bantuan reset password secara manual.
          </p>
        </article>
      </div>
    </div>
  );
};

export default EmailPage;