// file: src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './app.css'; // <-- Disesuaikan ke nama file yang benar
import { BrowserRouter } from 'react-router-dom';
import { MapProvider } from './components/MapProvider';
import 'leaflet/dist/leaflet.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 3. Bungkus aplikasi Anda */}
      <QueryClientProvider client={queryClient}>
          <MapProvider>
            <App />
          </MapProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);