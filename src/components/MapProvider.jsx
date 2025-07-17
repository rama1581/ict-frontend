import { APIProvider } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import apiClient from '../services/api';

export const MapProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const response = await apiClient.get('/api/config/maps');
        setApiKey(response.data.Maps_api_key);
      } catch (error) {
        console.error("Gagal mengambil API Key Peta:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchKey();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;
  }

  if (!apiKey) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Gagal memuat..</div>;
  }

  return <APIProvider apiKey={apiKey}>{children}</APIProvider>;
};