import React, { useEffect } from 'react';
import { FaBullseye, FaUsers, FaCheckCircle } from 'react-icons/fa';

const TentangPage = () => {
  useEffect(() => {
    document.title = 'Tentang Kami - ICT Taruna Bakti';
  }, []);

  return (
    <div className="bg-slate-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

        {/* Judul Halaman */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl tracking-tight">
            Tentang ICT Taruna Bakti
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Mengenal lebih dekat tim di balik layanan teknologi informasi Yayasan Taruna Bakti.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Kolom Gambar */}
            <div>
              <img 
                src="/img/tentang-kami.jpg" // Siapkan gambar yang relevan
                alt="Tim ICT Taruna Bakti" 
                className="rounded-xl w-full h-full object-cover" 
              />
            </div>

            {/* Kolom Teks */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <FaBullseye size={24} className="text-indigo-500 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-blue-900">Visi & Misi</h2>
                  <p className="text-slate-600 mt-2">
                    Menjadi pusat layanan teknologi informasi yang inovatif dan handal untuk mendukung keunggulan akademik dan operasional di lingkungan Yayasan Taruna Bakti.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaUsers size={24} className="text-indigo-500 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-blue-900">Tim Kami</h2>
                  <p className="text-slate-600 mt-2">
                    Terdiri dari para profesional di bidang jaringan, pengembangan sistem, dan dukungan teknis yang berdedikasi untuk memberikan pelayanan terbaik.
                  </p>
                </div>
              </div>
               <div className="flex items-start gap-4">
                <FaCheckCircle size={24} className="text-indigo-500 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-blue-900">Fokus Utama</h2>
                  <p className="text-slate-600 mt-2">
                    Fokus kami adalah memastikan infrastruktur teknologi yang stabil, aman, dan mudah diakses oleh seluruh civitas akademika Taruna Bakti.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TentangPage;