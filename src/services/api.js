import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://ict-backend.test', // Alamat backend Laravel Anda
  headers: {
    'Content-Type': 'application/json',
  }
});

export default apiClient;