import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';
import { motion } from 'framer-motion';

const RequestFormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Bantuan Teknis',
    message: '',
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Formulir Pengajuan - ICT Taruna Bakti';
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: 'Mengirim...', type: 'info' });
    try {
      await apiClient.post('/api/requests', formData);
      setStatus({ message: 'Pengajuan Anda berhasil terkirim! Tim kami akan segera menindaklanjuti.', type: 'success' });
      setFormData({ name: '', email: '', category: 'Bantuan Teknis', message: '' });
    } catch (error) {
      setStatus({ message: 'Gagal mengirim pengajuan. Pastikan semua kolom terisi dengan benar.', type: 'error' });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900">Formulir Pengajuan Layanan</h1>
          <p className="mt-4 text-lg text-slate-600">Isi formulir di bawah ini untuk meminta layanan atau bantuan teknis dari tim ICT.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-gray-400">
                {isSubmitting ? 'Mengirim...' : 'Kirim Pengajuan'}
              </button>
            </div>
            {status && (
              <p className={`text-center p-3 rounded-md text-sm ${
                status.type === 'success' ? 'bg-green-100 text-green-800' : 
                status.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {status.message}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RequestFormPage;