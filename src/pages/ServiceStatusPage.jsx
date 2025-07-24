import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';
import { FaCheckCircle, FaExclamationTriangle, FaWrench, FaHistory } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Konfigurasi untuk setiap status
const statusConfig = {
  Normal: { icon: <FaCheckCircle className="text-emerald-500" />, textColor: 'text-emerald-600', bgColor: 'bg-emerald-500', name: 'Berjalan Normal' },
  Gangguan: { icon: <FaExclamationTriangle className="text-red-500" />, textColor: 'text-red-600', bgColor: 'bg-red-500', name: 'Mengalami Gangguan' },
  Pemeliharaan: { icon: <FaWrench className="text-amber-500" />, textColor: 'text-amber-600', bgColor: 'bg-amber-500', name: 'Dalam Pemeliharaan' },
};

// Komponen untuk satu kartu status
const StatusCard = ({ service, index }) => {
  const config = statusConfig[service.status] || statusConfig['Normal'];
  const [showLogs, setShowLogs] = useState(false); // State untuk buka/tutup log

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className={`w-full h-2 ${config.bgColor}`}></div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-blue-900">{service.name}</h3>
          <div className="flex items-center gap-2">
            {config.icon}
            <span className={`font-bold ${config.textColor}`}>{config.name}</span>
          </div>
        </div>
        {service.description && <p className="text-slate-600 text-base mt-2">{service.description}</p>}
        
        {/* Tombol untuk menampilkan riwayat */}
        {service.logs && service.logs.length > 0 && (
          <button onClick={() => setShowLogs(!showLogs)} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 mt-4 flex items-center gap-2">
            <FaHistory />
            <span>{showLogs ? 'Sembunyikan' : 'Tampilkan'} Riwayat</span>
          </button>
        )}
      </div>

      {/* Riwayat log yang bisa dibuka-tutup */}
      <AnimatePresence>
        {showLogs && service.logs && service.logs.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-200 mx-6 mb-6 pt-4">
              <ul className="space-y-3">
                {service.logs.map((log, i) => (
                  <li key={i} className="text-sm text-slate-600 border-l-2 pl-3 border-slate-300">
                    <span className="font-semibold text-slate-800">{statusConfig[log.status]?.name || log.status}: </span>
                    {log.description}
                    <span className="block text-xs text-slate-400 mt-1">
                      {new Date(log.timestamp).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Komponen Utama Halaman
const ServiceStatusPage = () => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Status Layanan - ICT Taruna Bakti';
    const fetchStatuses = async () => {
      try {
        const response = await apiClient.get('/api/service-status');
        const services = response.data;

        // Fetch log untuk setiap service secara paralel
        const logsPromises = services.map(service =>
          apiClient.get(`/api/service-statuses/${service.id}/logs`).then(res => ({
            ...service,
            logs: res.data,
          }))
        );
        const servicesWithLogs = await Promise.all(logsPromises);
        
        setStatuses(servicesWithLogs);
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl">Status Layanan</h1>
          <p className="mt-4 text-xl text-slate-600">Dashboard operasional layanan ICT Taruna Bakti.</p>
        </div>
        
        <div className="space-y-6">
          {loading ? (
            <p className="text-center text-slate-500">Memuat status...</p>
          ) : (
            statuses.map((service, index) => (
              <StatusCard key={service.id} service={service} index={index} logs={service.logs} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceStatusPage;