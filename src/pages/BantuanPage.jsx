import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const BantuanPage = () => {
  useEffect(() => {
    document.title = 'Bantuan Teknis - ICT Taruna Bakti';
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose lg:prose-xl max-w-none">
          <Link to="/layanan" className="text-indigo-600 hover:underline no-underline mb-8 inline-block">
            &larr; Kembali ke semua layanan
          </Link>
          
          <h1>Bantuan Teknis</h1>
          <p>
            Tim ICT Support siap membantu Anda jika mengalami kendala teknis terkait layanan yang kami sediakan. Kami menyediakan beberapa jalur untuk mendapatkan bantuan.
          </p>
          
          <h2>Jam Operasional</h2>
          <p>
            Tim support kami tersedia pada jam kerja:
          </p>
          <ul>
            <li><strong>Senin - Jumat:</strong> 07:00 - 16:00 WIB</li>
            <li><strong>Sabtu:</strong> 08:00 - 12:00 WIB (Hanya melalui email)</li>
          </ul>

          <h2>Cara Menghubungi</h2>
          <p>
            Untuk respons tercepat, silakan datang langsung ke ruang ICT. Anda juga bisa mengirimkan email ke <a href="mailto:icttarunabakti@tarunabakti.or.id">icttarunabakti@tarunabakti.or.id</a> dengan menyertakan detail masalah yang Anda hadapi.
          </p>
        </article>
      </div>
    </div>
  );
};

export default BantuanPage;