// file: src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './app.css'; // <-- Disesuaikan ke nama file yang benar
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MapProvider } from './components/MapProvider';
import 'leaflet/dist/leaflet.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <MapProvider>
          <App />
        </MapProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
);