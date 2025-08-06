import { APIProvider } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import apiClient from '../services/api';

// ==================================================================
// ==================== KOMPONEN SKELETON BARU ======================
// ==================================================================
const MapSkeleton = () => (
  <div className="w-full min-h-screen p-4 md:p-8 bg-gray-50">
    {/* Skeleton untuk header halaman (opsional, tapi membuat tampilan lebih baik) */}
    <div className="h-8 w-1/3 bg-gray-300 rounded mb-4 animate-pulse"></div>
    <div className="h-4 w-1/2 bg-gray-200 rounded mb-8 animate-pulse"></div>

    {/* Skeleton untuk area peta */}
    <div className="relative w-full h-[70vh] bg-gray-300 rounded-lg animate-pulse overflow-hidden">
        {/* Elemen UI peta palsu */}
        <div className="absolute top-4 left-4 h-10 w-24 bg-gray-400/50 rounded-md"></div>
        <div className="absolute bottom-4 right-4 h-10 w-10 bg-gray-400/50 rounded-full"></div>
        <div className="absolute bottom-16 right-4 h-10 w-10 bg-gray-400/50 rounded-full"></div>
    </div>
  </div>
);


export const MapProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const response = await apiClient.get('/api/config/maps');
        setApiKey(response.data.Maps_api_key);
      } catch (error) {
        console.error("Gagal mengambil API Key Peta:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchKey();
  }, []);

  // Tampilkan skeleton saat API key sedang diambil
  if (loading) {
    return <MapSkeleton />;
  }

  // Tampilkan pesan error yang lebih jelas jika API key tidak ditemukan
  if (!apiKey) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-700 p-4">
            <h2 className="text-2xl font-bold text-center">Gagal Memuat Peta</h2>
            <p className="mt-2 text-center">Tidak dapat mengambil konfigurasi API Key. Harap hubungi administrator.</p>
        </div>
    );
  }

  // Jika berhasil, sediakan APIProvider dengan key yang didapat
  return <APIProvider apiKey={apiKey}>{children}</APIProvider>;
};