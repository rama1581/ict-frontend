import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api';

// Gambar default jika API gagal atau tidak ada gambar
const defaultImages = ['/bg-1.jpg']; 
// URL backend Anda (sesuaikan jika perlu)
const API_URL = 'http://ict-backend.test'; 

const BackgroundSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mengambil daftar gambar dari API
  const { data: apiImages } = useQuery({
    queryKey: ['slideshowImages'],
    queryFn: async () => {
      const response = await apiClient.get('/api/slideshow-images');
      return response.data;
    },
    // Menambahkan cache agar tidak selalu fetch ulang
  });

  // Menentukan gambar mana yang akan ditampilkan
  const imagesToDisplay = apiImages && apiImages.length > 0 ? apiImages : defaultImages;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === imagesToDisplay.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [currentIndex, imagesToDisplay.length]);

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      {imagesToDisplay.map((imagePath, index) => {
        // Gabungkan URL backend dengan path gambar dari API
        const imageUrl = imagePath.startsWith('/') ? imagePath : `${API_URL}/storage/${imagePath}`;
        
        return (
          <img
            key={index}
            src={imageUrl}
            alt={`Background ${index + 1}`}
            className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${
              currentIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        );
      })}
    </div>
  );
};

export default BackgroundSlideshow;