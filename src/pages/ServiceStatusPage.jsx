import React from 'react';
import apiClient from '../services/api';
import { FaCheckCircle, FaExclamationTriangle, FaWrench } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

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

const fetchServiceStatuses = async () => {
  const response = await apiClient.get('/api/service-status');
  return response.data;
};

const StatusCard = ({ service, index }) => {
  const config = statusConfig[service.status] || statusConfig['Normal'];
  const updatedTime = service.updated_at
    ? dayjs(service.updated_at).fromNow()
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className={`w-full h-2 ${config.bgColor}`} />
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-blue-900">{service.name}</h3>
          <div className="flex items-center gap-2">
            {config.icon}
            <span className={`font-bold ${config.textColor}`}>{config.name}</span>
          </div>
        </div>

        {service.description && (
          <p className="text-slate-600 text-base mt-2">{service.description}</p>
        )}

        {updatedTime && (
          <p className="text-xs text-slate-400 mt-1">
            Status diupdate {updatedTime}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
    <div className="h-2 bg-slate-200 rounded w-full mb-4" />
    <div className="h-6 bg-slate-200 rounded w-1/3 mb-2" />
    <div className="h-4 bg-slate-200 rounded w-2/3 mb-4" />
    <div className="h-4 bg-slate-200 rounded w-full mb-2" />
    <div className="h-4 bg-slate-200 rounded w-5/6" />
  </div>
);

// ✅ Komponen Waktu Realtime
const RealtimeClock = () => {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatted = now.toLocaleString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <p className="text-sm text-slate-400 mt-2">
      Waktu saat ini: {formatted}
    </p>
  );
};

const ServiceStatusPage = () => {
  const { data: statuses, isLoading, isError } = useQuery({
    queryKey: ['service-statuses'],
    queryFn: fetchServiceStatuses,
    refetchInterval: 10000, // auto-refresh tiap 10 detik
  });

  React.useEffect(() => {
    document.title = 'Status Layanan - ICT Taruna Bakti';
  }, []);

  return (
    <div className="bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl">
            Status Layanan
          </h1>
          <p className="mt-4 text-xl text-slate-600">
            Dashboard operasional layanan ICT Taruna Bakti.
          </p>
          <RealtimeClock />
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : isError ? (
            <p className="text-center text-red-500">Gagal mengambil data.</p>
          ) : (
            statuses.map((service, index) => (
              <StatusCard key={service.id} service={service} index={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceStatusPage;
