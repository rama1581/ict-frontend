import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';

const NewsPage = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await apiClient.get('/api/news');
                setNewsItems(response.data.data);
            } catch (err) {
                setError("Gagal mengambil data news.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (loading) return <p className="text-center p-12">Memuat news...</p>;
    if (error) return <p className="text-center p-12 text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-extrabold text-center mb-12">News Section</h1>
            <div className="space-y-12">
                {newsItems.length > 0 ? (
                    newsItems.map((item) => (
                        <article key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                            {/* Menampilkan THUMBNAIL */}
                            {item.thumbnail && (
                                <img
                                    src={`http://127.0.0.1:8000/storage/${item.thumbnail}`}
                                    alt={item.title}
                                    className="w-full h-80 object-cover"
                                />
                            )}
                            <div className="p-6">
                                {/* Menampilkan TITLE */}
                                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                                    {item.title}
                                </h2>
                                {/* Menampilkan CONTENT */}
                                <div
                                    className="prose dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: item.content }}
                                />
                            </div>
                        </article>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Belum ada news yang dipublikasikan.</p>
                )}
            </div>
        </div>
    );
};

export default NewsPage;