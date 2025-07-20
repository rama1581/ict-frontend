import { Helmet } from 'react-helmet-async';
import { FaWifi, FaEnvelopeOpenText, FaLaptopCode, FaQuestionCircle } from 'react-icons/fa';

// Data untuk kartu-kartu layanan
const services = [
  {
    icon: <FaWifi size={40} className="text-indigo-500" />,
    title: 'Jaringan & Internet',
    description: 'Akses internet cepat dan stabil di seluruh area kampus melalui jaringan WiFi kami.',
    link: '/layanan/jaringan'
  },
  {
    icon: <FaEnvelopeOpenText size={40} className="text-indigo-500" />,
    title: 'Email & Akun',
    description: 'Manajemen akun email resmi Taruna Bakti dan layanan terkait lainnya.',
    link: '/layanan/email'
  },
];

const LayananPage = () => {
  return (
    <>
      <Helmet>
        <title>Layanan - ICT Taruna Bakti</title>
      </Helmet>
      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Judul Halaman */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl">
              Layanan Kami
            </h1>
            <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
              Kami menyediakan berbagai layanan teknologi untuk mendukung seluruh aktivitas akademik di Taruna Bakti.
            </p>
          </div>

          {/* Grid Kartu Layanan */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <a href={service.link} key={service.title} className="block group">
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl h-full transform hover:-translate-y-2 transition-all duration-300">
                  <div className="mb-6">{service.icon}</div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-600">
                    {service.description}
                  </p>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default LayananPage;