import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api';
import { ArrowLeft } from 'lucide-react';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

const fetchNewsDetail = async (slug) => {
  const response = await apiClient.get(`/api/news/${slug}`);
  return response.data;
};

const NewsDetailPage = () => {
  const { slug } = useParams();

  const {
    data: newsItem,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['news-detail', slug],
    queryFn: () => fetchNewsDetail(slug),
  });

  useEffect(() => {
    if (newsItem) {
      document.title = `${newsItem.title} - ICT Taruna Bakti`;
    } else {
      document.title = 'Memuat Berita...';
    }
  }, [newsItem]);

  if (isLoading) return <div className="text-center p-20 text-gray-700">Memuat berita...</div>;
  if (error) return <div className="text-center p-20 text-red-500">Berita tidak ditemukan.</div>;
  if (!newsItem) return null;

  return (
    <div className="bg-white">
      {/* Header Image dengan Judul & Tombol */}
      {newsItem.thumbnail && (
        <div className="relative h-[85vh] w-full overflow-hidden">
          <img
            src={`http://ict-backend.test/storage/${newsItem.thumbnail}`}
            alt={newsItem.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-white/5" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-16">
            <Link
              to="/pengumuman"
              className="inline-flex items-center gap-2 text-white hover:text-blue-900 border border-white hover:bg-white font-medium text-sm px-4 py-2 rounded-full transition duration-300 shadow-lg mb-6 self-start"
            >
              <ArrowLeft size={18} />
              Kembali ke semua berita
            </Link>
            <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-4 leading-tight">
              {newsItem.title}
            </h1>
            <div className="text-white text-sm flex flex-wrap gap-3 items-center drop-shadow">
              <span className="font-medium">Oleh: {newsItem.author?.name || 'Admin'}</span>
              <span>•</span>
              <span>{formatDate(newsItem.created_at)}</span>
              {newsItem.category && (
                <>
                  <span>•</span>
                  <span className="bg-white/20 text-white font-semibold px-3 py-1 rounded-full text-xs">
                    {newsItem.category.name}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Konten Berita */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className="prose prose-lg max-w-none prose-img:rounded-xl prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: newsItem.content }}
        />
      </div>
    </div>
  );
};

export default NewsDetailPage;
