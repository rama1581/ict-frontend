import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const slidesData = [
  {
    id: 1,
    title: 'Berita & Informasi Terkini',
    description: 'Dapatkan update terbaru seputar kegiatan dan prestasi di Taruna Bakti.',
    link: '/news',
  },
  {
    id: 2,
    title: 'Panduan Pengguna',
    description: 'Butuh bantuan? Lihat panduan lengkap untuk menggunakan layanan ICT kami.',
    link: '/panduan',
  },
  {
    id: 3,
    title: 'Kalender Akademik',
    description: 'Jangan lewatkan jadwal dan tanggal-tanggal penting dalam kalender akademik.',
    link: '/kalender',
  },
];

const backgroundImages = [
  '/bg-1.jpg',
  '/bg-2.jpg',
  '/bg-3.jpg',
];

const BackgroundSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      {backgroundImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Background ${index + 1}`}
          className={`
            w-full h-full object-cover absolute top-0 left-0
            transition-opacity duration-1000 ease-in-out
            ${currentIndex === index ? 'opacity-100' : 'opacity-0'}
          `}
        />
      ))}
    </div>
  );
};

function HomePage() {
  return (
    <section className="relative w-full min-h-screen">
      <BackgroundSlideshow />
      
      <div className="absolute inset-0 w-full h-full bg-white/70 backdrop-blur-sm z-10"></div>
      
      <div className="relative z-20 w-full h-full flex items-start justify-center pt-30 p-4">
        {/* 👇 Padding atas-bawah (py) diperbesar lagi */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-4xl text-center px-8 py-24 border border-gray-200">
          <Swiper
            modules={[Navigation]}
            navigation={true}
            loop={true}
            className="w-full"
          >
            {slidesData.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="px-6 py-4">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-gray-700 mb-8 max-w-lg mx-auto">
                    {slide.description}
                  </p>
                  <a 
                    href={slide.link} 
                    className="inline-block px-8 py-3 bg-blue-800 hover:bg-blue-900 rounded-full text-white font-semibold shadow-md transition-transform duration-300 hover:scale-105"
                  >
                    Lihat Selengkapnya
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default HomePage;