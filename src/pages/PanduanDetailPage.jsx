import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api'; // Pastikan path ini benar
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

// Helper untuk format tanggal
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

// Fungsi untuk fetch detail panduan
const fetchGuideDetail = async (slug) => {
  const response = await apiClient.get(`/api/guides/${slug}`);
  return response.data;
};

// Komponen Skeleton untuk Halaman Detail
const DetailSkeleton = () => (
    <div className="bg-white animate-pulse">
      {/* Skeleton Header */}
      <div className="relative h-[60vh] md:h-[85vh] w-full bg-gray-200" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 md:-mt-60 relative z-10">
        <div className="h-10 w-48 bg-gray-300 rounded-full mb-6" />
        <div className="h-12 md:h-16 w-full bg-gray-300 rounded mb-4" />
        <div className="flex gap-3">
          <div className="h-4 w-32 bg-gray-300 rounded-full" />
          <div className="h-4 w-6 bg-gray-300 rounded-full" />
          <div className="h-4 w-24 bg-gray-300 rounded-full" />
        </div>
      </div>
      {/* Skeleton Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-64 bg-gray-300 rounded-lg my-6" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
    </div>
);


const PanduanDetailPage = () => {
  const { slug } = useParams();

  const { data: guideItem, isLoading, isError } = useQuery({
    queryKey: ['guide-detail', slug],
    queryFn: () => fetchGuideDetail(slug),
  });

  useEffect(() => {
    if (guideItem) {
      document.title = `${guideItem.title} - Panduan ICT`;
    } else {
      document.title = 'Memuat Panduan...';
    }
  }, [guideItem]);

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (isError) {
    return (
        <div className="text-center py-20 bg-slate-50 min-h-screen">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Panduan Tidak Ditemukan</h2>
            <p className="text-gray-600 mb-8">Maaf, kami tidak dapat menemukan panduan yang Anda cari.</p>
            <Link
              to="/panduan"
              className="group relative inline-flex items-center justify-center gap-2 bg-blue-900 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-lg overflow-hidden transition-all duration-300"
            >
              <ArrowLeft size={18} />
              Kembali ke Semua Panduan
            </Link>
        </div>
    );
  }

  if (!guideItem) return null;

  return (
    <div className="bg-white">
      {/* Header dengan Thumbnail */}
      <div className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden">
        <img
          src={guideItem.thumbnail ? `http://ict-backend.test/storage/${guideItem.thumbnail}` : 'https://placehold.co/1920x1080/e2e8f0/e2e8f0?text='}
          alt={guideItem.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1920x1080/e2e8f0/94a3b8?text=Image+Not+Found'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-16">
          <Link
            to="/panduan"
            className="group relative inline-flex items-center justify-center gap-2 text-white font-semibold text-sm px-4 py-2 rounded-full mb-6 self-start shadow-lg border border-white/50 hover:border-transparent overflow-hidden transition-all duration-300"
          >
            {/* Lapisan gradasi saat hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(to right, #002874, #54C0DA)' }}
            ></div>
            <span className="relative z-10 flex items-center gap-2">
              <ArrowLeft size={18} />
              Kembali ke semua panduan
            </span>
          </Link>

          <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-4 leading-tight">
            {guideItem.title}
          </h1>
          <div className="text-white text-sm flex flex-wrap gap-x-4 gap-y-2 items-center drop-shadow">
            <span className="bg-white/20 text-white font-semibold px-3 py-1 rounded-full text-xs">
              {guideItem.category}
            </span>
            <span>•</span>
            <span>Diterbitkan pada: {formatDate(guideItem.created_at)}</span>
          </div>
        </div>
      </div>

      {/* Konten Panduan */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className="prose prose-lg max-w-none prose-img:rounded-xl prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: guideItem.content }}
        />
      </div>
    </div>
  );
};

export default PanduanDetailPage;