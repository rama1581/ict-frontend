import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import apiClient from '../services/api';
import { FaInstagram, FaGlobe, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// Ikon kustom untuk logo sekolah
const customIcon = new L.Icon({
    iconUrl: '/logo-tb.png', // Pastikan logo ada di folder /public
    iconSize: [45, 45],
    iconAnchor: [22, 45],
    popupAnchor: [0, -45]
});

const Footer = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await apiClient.get('/api/location/school');
        
        // Cek jika data dan properti 'location' ada
        if (response.data?.location?.lat) {
          setLocation(response.data.location);
        }
      } catch (error) {
        console.error("Gagal mengambil lokasi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocation();
  }, []); // Dependensi kosong agar hanya berjalan sekali

  return (
    // 👇 PERUBAHAN DI SINI
    <footer className="bg-[#333333] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Kolom 1: Kontak & Media Sosial */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Hubungi Kami</h3>
          <div className="space-y-4">
            <a href="mailto:icttarunabakti@tarunabakti.or.id" className="flex items-center gap-3 hover:text-white transition-colors">
              <FaEnvelope size={20} />
              <span>icttarunabakti@tarunabakti.or.id</span>
            </a>
            <a href="https://www.instagram.com/tarunabakti_id/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
              <FaInstagram size={20} />
              <span>@tarunabakti_id</span>
            </a>
            <a href="https://tarunabakti.or.id" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
              <FaGlobe size={20} />
              <span>tarunabakti.or.id</span>
            </a>
             <div className="flex items-start gap-3">
              <FaMapMarkerAlt size={20} className="mt-1 flex-shrink-0" />
              <span>Jl. L. L. R.E. Martadinata No.52, Kota Bandung 40115</span>
            </div>
          </div>
        </div>

        {/* Kolom 2: Peta Lokasi Dinamis */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-xl font-semibold text-white">Lokasi Kami</h3>
          <div className="h-64 w-full rounded-lg overflow-hidden border-2 border-gray-600 bg-gray-700 flex items-center justify-center">
            {loading ? (
              <p className="animate-pulse">Memuat peta...</p>
            ) : location ? (
              <MapContainer 
                center={[location.lat, location.lng]} 
                zoom={17} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
                attributionControl={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[location.lat, location.lng]} icon={customIcon}>
                  <Popup>Yayasan Taruna Bakti</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <p>Lokasi belum diatur dari admin.</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Bagian Copyright */}
      <div className="bg-black/20 py-6 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} ICT Taruna Bakti. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;