import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';
import { motion } from 'framer-motion';
import {
  FaPaperPlane, FaCopy, FaCheckCircle,
  FaExclamationCircle, FaSpinner
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

const KontakPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Bantuan Teknis',
    message: '',
  });
  const [ticketCode, setTicketCode] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    document.title = 'Formulir Pengajuan - ICT Taruna Bakti';
    const savedTicket = localStorage.getItem('lastTicketCode');
    if (savedTicket) setTicketCode(savedTicket);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiClient.post('/api/requests', data);
      return response.data;
    },
    onMutate: () => {
      setStatus({ message: 'Mengirim...', type: 'info' });
      setTicketCode('');
    },
    onSuccess: (data) => {
      const newTicketCode = data.ticket_code;
      localStorage.setItem('lastTicketCode', newTicketCode);
      setStatus({ message: `Pengajuan berhasil! Kode Tiket Anda: ${newTicketCode}`, type: 'success' });
      setTicketCode(newTicketCode);
      setFormData({ name: '', email: '', category: 'Bantuan Teknis', message: '' });
    },
    onError: (error) => {
      if (error.response?.status === 422) {
        setStatus({ message: error.response.data.errors.email[0], type: 'error' });
      } else {
        setStatus({ message: 'Terjadi kesalahan pada server. Coba lagi.', type: 'error' });
      }
      console.error(error);
    },
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(ticketCode);
    alert('Kode tiket berhasil disalin!');
  };

  const goToStatusPage = () => {
    navigate('/status-pengajuan');
  };

  return (
    <div className="bg-slate-50 py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900">Formulir Pengajuan Layanan</h1>
          <p className="mt-4 text-lg text-slate-600">Isi formulir di bawah ini untuk meminta bantuan dari tim ICT.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(formData); }} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select name="category" id="category" value={formData.category} onChange={handleChange} className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option>Bantuan Teknis</option>
                <option>Reset Password</option>
                <option>Permintaan Software</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
              <textarea name="message" id="message" rows="4" value={formData.message} onChange={handleChange} required className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
            <div>
              <button type="submit" disabled={mutation.isPending} className="w-full inline-flex items-center justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-slate-400">
                {mutation.isPending ? <FaSpinner className="animate-spin mr-2" /> : <FaPaperPlane className="mr-2" />}
                {mutation.isPending ? 'Mengirim...' : 'Kirim Pengajuan'}
              </button>
            </div>
          </form>
        </motion.div>

        {status?.message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-xl text-center ${
              status.type === 'success' ? 'bg-green-100 text-green-800' :
              status.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              {status.type === 'success' && <FaCheckCircle />}
              {status.type === 'error' && <FaExclamationCircle />}
              <p className="font-medium">{status.message}</p>
            </div>
            {ticketCode && (
              <div className="mt-3">
                <button onClick={handleCopy} className="text-sm inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-full">
                  <FaCopy /> Salin Kode Tiket
                </button>
                <button onClick={goToStatusPage} className="ml-3 text-sm inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full">
                  <FaCheckCircle /> Cek Status Pengajuan
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default KontakPage;
