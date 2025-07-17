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
    // 1. Ganti background utama menjadi putih
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="bg-gray-50 rounded-3xl shadow-xl max-w-lg w-full p-12 text-center border border-gray-200">
        
        {/* 2. Ganti gradasi teks menjadi warna solid */}
        <h1 className="text-6xl font-extrabold text-blue-900 mb-6">
          Ict Taruna Bakti
        </h1>

        {/* 3. Ganti warna teks paragraf */}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Pesan dari Backend:{' '}
          <strong className="ml-2 font-semibold text-purple-600">
            {message || 'Menghubungkan...'}
          </strong>
        </p>

        <button
          className="px-8 py-3 bg-blue-800 hover:bg-blue-900 active:bg-blue-950 rounded-full text-white text-lg font-semibold shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          onClick={() => alert('Tombol diklik!')}
        >
          Mulai Sekarang
        </button>
      </div>
    </div>
  );
}

export default HomePage;