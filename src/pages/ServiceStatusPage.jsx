import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';
import { FaCheckCircle, FaExclamationTriangle, FaWrench, FaWifi } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Konfigurasi untuk setiap status (ikon, warna, dll.)
const statusConfig = {
  Normal: {
    icon: <FaCheckCircle className="text-emerald-500" />,
    textColor: 'text-emerald-600',
    bgColor: 'bg-emerald-500',
    name: 'Berjalan Normal',
  },
  Gangguan: {
    icon: <FaExclamationTriangle className="text-red-500" />,
    textColor: 'text-red-600',
    bgColor: 'bg-red-500',
    name: 'Mengalami Gangguan',
  },
  Pemeliharaan: {
    icon: <FaWrench className="text-amber-500" />,
    textColor: 'text-amber-600',
    bgColor: 'bg-amber-500',
    name: 'Dalam Pemeliharaan',
  },
};

// Komponen untuk satu kartu status
const StatusCard = ({ service, index }) => {
  const config = statusConfig[service.status] || statusConfig['Normal'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className={`w-full h-2 ${config.bgColor}`}></div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-blue-900">{service.name}</h3>
          <div className="flex items-center gap-2">
            {config.icon}
            <span className={`font-bold ${config.textColor}`}>{config.name}</span>
          </div>
        </div>
        {service.description && <p className="text-slate-600 text-base">{service.description}</p>}
      </div>
    </motion.div>
  );
};

// Komponen Utama Halaman
const ServiceStatusPage = () => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    document.title = 'Status Layanan - ICT Taruna Bakti';
    const fetchStatuses = async () => {
      try {
        const response = await apiClient.get('/api/service-status');
        setStatuses(response.data);
        setLastUpdated(new Date()); // Catat waktu update
      } catch (error) {
        console.error("Gagal mengambil status layanan:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatuses();
  }, []);

  return (
    <div className="bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm-px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl">Status Layanan</h1>
          <p className="mt-4 text-xl text-slate-600">Dashboard operasional layanan ICT Taruna Bakti.</p>
          {lastUpdated && (
            <p className="mt-2 text-sm text-slate-500">
              Terakhir diperbarui: {lastUpdated.toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}
            </p>
          )}
        </div>

        <AnimatePresence>
          <div className="space-y-6">
            {loading ? (
              <p className="text-center text-slate-500">Memuat status...</p>
            ) : (
              statuses.map((service, index) => (
                <StatusCard key={service.id} service={service} index={index} />
              ))
            )}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServiceStatusPage;