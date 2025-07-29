import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Navigation, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api';

import 'swiper/css';
import 'swiper/css/navigation';

const backgroundImages = ['/bg-1.jpg', '/bg-2.jpg', '/bg-3.jpg'];

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
          className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${
            currentIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
};

function decodeHtmlEntities(str) {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

// SKELETON COMPONENT
const FeaturedNewsSkeleton = () => (
  <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-4xl px-8 py-16 border border-gray-200 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 py-4">
      <div className="w-full h-64 bg-gray-300 rounded-lg shadow-md"></div>
      <div className="space-y-4">
        <div className="h-5 w-32 bg-gray-300 rounded"></div>
        <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
        <div className="h-4 w-full bg-gray-300 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
        <div className="h-10 w-40 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  </div>
);

function HomePage() {
  const { data: featuredNews = [], isLoading, isError } = useQuery({
    queryKey: ['featuredNews'],
    queryFn: async () => {
      const response = await apiClient.get('/api/news');
      return response.data.data.slice(0, 3);
    },
  });

  useEffect(() => {
    document.title = "Beranda - ICT Taruna Bakti";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Selamat datang di halaman beranda ICT Taruna Bakti. Temukan berita terbaru, panduan pengguna, dan informasi penting lainnya.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Selamat datang di halaman beranda ICT Taruna Bakti. Temukan berita terbaru, panduan pengguna, dan informasi penting lainnya.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen">
      <BackgroundSlideshow />
      <div className="absolute inset-0 w-full h-full bg-white/70 backdrop-blur-sm z-10"></div>

      <div className="relative z-20 w-full h-full flex items-start justify-center pt-35 p-4">
        {isLoading ? (
          <FeaturedNewsSkeleton />
        ) : isError ? (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center text-red-500">
            Gagal memuat berita unggulan.
          </div>
        ) : featuredNews.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center">
            Tidak ada berita untuk ditampilkan.
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-4xl px-8 py-16 border border-gray-200">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={true}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="w-full"
            >
              {featuredNews.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 py-4">
                    <div className="w-full h-64">
                      <img
                        src={`http://ict-backend.test/storage/${slide.thumbnail}`}
                        alt={slide.title}
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-purple-600 mb-2">Berita Terkini</p>
                      <h1 className="text-3xl font-extrabold text-blue-900 mb-4 leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-base text-gray-700 mb-6">
                        {decodeHtmlEntities(slide.content.replace(/<[^>]+>/g, '').substring(0, 100))}...
                      </p>
                      <Link
                        to={`/news/${slide.slug}`}
                        className="inline-block px-6 py-3 bg-blue-800 hover:bg-blue-900 rounded-full text-white font-semibold shadow-md transition-transform duration-300 hover:scale-105"
                      >
                        Baca Selengkapnya
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}

export default HomePage;
