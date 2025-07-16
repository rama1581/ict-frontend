import { useEffect, useState } from 'react';
import apiClient from '../services/api';

function HomePage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    apiClient.get('/api/test')
      .then(res => setMessage(res.data.message))
      .catch(err => console.error("Error fetching API:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-indigo-900 to-purple-900 flex items-center justify-center p-6">
      <div className="bg-gradient-to-r from-black/70 via-black/50 to-black/70 backdrop-blur-lg rounded-3xl shadow-2xl max-w-lg w-full p-12 text-center border border-purple-700">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-6 drop-shadow-lg">
          React + Laravel
        </h1>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Pesan dari Backend:{' '}
          <strong className="ml-2 font-semibold text-indigo-400 animate-pulse">
            {message || 'Menghubungkan...'}
          </strong>
        </p>
        <button
          className="px-8 py-3 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 rounded-full text-white text-lg font-semibold shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          onClick={() => alert('Tombol mewah diklik!')}
        >
          Mulai Sekarang
        </button>
      </div>
    </div>
  );
}

export default HomePage;
