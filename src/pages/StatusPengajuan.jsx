import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTicketAlt,
  FaCheckCircle,
  FaSpinner,
  FaTimesCircle,
  FaHourglassHalf,
  FaTools,
} from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';

const formatDate = (dateString) =>
  new Date(dateString).toLocaleString('id-ID', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

const statusConfig = {
  pending: {
    class: 'bg-yellow-100 text-yellow-800',
    icon: <FaHourglassHalf className="text-yellow-500" />,
    color: 'bg-yellow-400',
    text: 'Menunggu Diproses',
  },
  'in progress': {
    class: 'bg-blue-100 text-blue-800',
    icon: <FaTools className="text-blue-500" />,
    color: 'bg-blue-500',
    text: 'Sedang Dikerjakan',
  },
  completed: {
    class: 'bg-green-100 text-green-800',
    icon: <FaCheckCircle className="text-green-600" />,
    color: 'bg-green-500',
    text: 'Selesai',
  },
};

const StatusPengajuanPage = () => {
  const [ticketCode, setTicketCode] = useState('');
  const [submittedCode, setSubmittedCode] = useState('');

  useEffect(() => {
    document.title = 'Status Pengajuan - ICT Taruna Bakti';
    const saved = localStorage.getItem('last_ticket_code');
    if (saved) setTicketCode(saved);
  }, []);

  const {
    data: result,
    error,
    isFetching,
    refetch,
    isFetched,
  } = useQuery({
    queryKey: ['ticket-status', submittedCode],
    queryFn: async () => {
      const res = await apiClient.get(`/api/requests/status/${ticketCode}`);
      return res.data;
    },
    enabled: false,
    retry: false,
  });

  const handleCheckStatus = async (e) => {
    e.preventDefault();
    localStorage.setItem('last_ticket_code', ticketCode);
    setSubmittedCode(ticketCode);
    refetch();
  };

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-gradient-to-br from-white via-slate-50 to-indigo-50 py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-indigo-800 drop-shadow-lg">Lacak Tiket Anda</h1>
          <p className="mt-4 text-lg text-slate-600">Masukkan kode tiket untuk melihat progres pengajuan layanan Anda.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <form onSubmit={handleCheckStatus} className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-full">
              <FaTicketAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
              <input
                type="text"
                placeholder="Masukkan Kode Tiket Anda"
                value={ticketCode}
                onChange={(e) => setTicketCode(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isFetching}
              className="px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-md hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {isFetching ? <FaSpinner className="animate-spin" /> : 'Lacak'}
            </button>
          </form>
        </motion.div>

        {/* Skeleton Loading */}
        {isFetching && (
          <div className="mt-10 bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
            <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 p-6">
              <div className="h-6 bg-indigo-400 w-1/3 rounded mb-2" />
            </div>
            <div className="p-6 space-y-5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-gray-200 w-1/4 rounded" />
                  <div className="h-4 bg-gray-300 w-1/3 rounded" />
                </div>
              ))}
              <div className="pt-5 border-t">
                <div className="h-4 bg-gray-300 w-24 mb-2 rounded" />
                <div className="h-20 bg-gray-100 rounded-xl" />
              </div>
            </div>
            <div className="px-6 pt-8 pb-10 border-t">
              <div className="h-5 bg-gray-300 w-40 mb-6 rounded" />
              {[...Array(2)].map((_, i) => (
                <div key={i} className="mb-8 ml-6 relative">
                  <span className="absolute w-6 h-6 bg-indigo-300 rounded-full -left-3.5 ring-8 ring-white shadow" />
                  <div className="p-4 bg-slate-50 rounded-xl border border-gray-200 shadow-sm space-y-2">
                    <div className="h-3 bg-gray-200 w-32 rounded" />
                    <div className="h-4 bg-gray-300 w-40 rounded" />
                    <div className="h-3 bg-gray-200 w-full rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex items-center justify-center gap-3 bg-red-100 text-red-800 p-4 rounded-xl shadow-sm"
            >
              <FaTimesCircle />
              <p className="font-medium">
                {error?.response?.data?.message || 'Kode tiket tidak ditemukan atau terjadi kesalahan.'}
              </p>
            </motion.div>
          )}

          {result && isFetched && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-10 bg-white rounded-3xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 p-6">
                <h3 className="text-white text-2xl font-semibold">Detail Tiket: {result.ticket_code}</h3>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium">Nama</span>
                  <span className="font-semibold">{result.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium">Kategori</span>
                  <span className="font-semibold">{result.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium">Tanggal Pengajuan</span>
                  <span className="font-semibold">{formatDate(result.created_at)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Status</span>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${statusConfig[result.status]?.class}`}>
                    {statusConfig[result.status]?.icon}
                    {result.status}
                  </div>
                </div>
                <div className="pt-5 border-t">
                  <p className="text-slate-700 font-medium mb-2">Pesan Anda:</p>
                  <div className="bg-slate-50 p-4 rounded-xl text-slate-700 shadow-inner">{result.message}</div>
                </div>
              </div>

              {result.progresses?.length > 0 && (
                <div className="px-6 pt-8 pb-10 border-t">
                  <h4 className="text-xl font-semibold text-indigo-700 mb-6">Riwayat Progress</h4>
                  <div className="relative border-l-4 border-indigo-200 ml-3">
                    {result.progresses.map((progress, index) => {
                      const config = statusConfig[progress.status] || {};
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.2 }}
                          className="mb-8 ml-6"
                        >
                          <span className={`absolute w-6 h-6 ${config.color} rounded-full -left-3.5 flex items-center justify-center ring-8 ring-white shadow`}>
                            {config.icon}
                          </span>
                          <div className="p-4 bg-slate-50 rounded-xl border border-gray-200 shadow-sm">
                            <time className="block mb-1 text-sm text-gray-500">{formatDate(progress.created_at)}</time>
                            <h3 className="text-base font-semibold text-gray-800">{config.text || progress.status}</h3>
                            <p className="text-sm text-gray-600">{progress.note}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StatusPengajuanPage;
