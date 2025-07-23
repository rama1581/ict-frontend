import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Navigation, Autoplay } from 'swiper/modules';
import apiClient from '../services/api';

import 'swiper/css';
import 'swiper/css/navigation';

const backgroundImages = ['/bg-1.jpg', '/bg-2.jpg', '/bg-3.jpg'];

const BackgroundSlideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1));
        }, 5000);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    return (
        <div className="absolute inset-0 w-full h-full z-0">
            {backgroundImages.map((image, index) => (
                <img key={index} src={image} alt={`Background ${index + 1}`}
                    className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
                />
            ))}
        </div>
    );
};

function decodeHtmlEntities(str) {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
}

function HomePage() {
    const [featuredNews, setFeaturedNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchFeaturedNews = async () => {
            try {
                const response = await apiClient.get('/api/news');
                const allNews = response.data.data;
                setFeaturedNews(allNews.slice(0, 3));
            } catch (error) {
                console.error("Gagal mengambil berita unggulan:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedNews();
    }, []);
const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    // Tampilkan langsung di UI
    setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: newMessage },
    ]);

    const messageToSend = newMessage;
    setNewMessage('');

    try {
        const response = await apiClient.post('/messages', {
            message: messageToSend,
        });

        console.log('Pesan berhasil disimpan:', response.data);
    } catch (error) {
        console.error('Gagal mengirim pesan:', error);
        // Tampilkan error ke UI jika perlu
    }
};

    return (
        <section className="relative w-full min-h-screen">
            <helmet>
                <title>Beranda - ICT Taruna Bakti</title>
                <meta name="description" content="Selamat datang di halaman beranda ICT Taruna Bakti. Temukan berita terbaru, panduan pengguna, dan informasi penting lainnya." />
            </helmet>

            <BackgroundSlideshow />

            <div className="absolute inset-0 w-full h-full bg-white/70 backdrop-blur-sm z-10"></div>

            <div className="relative z-20 w-full h-full flex items-start justify-center pt-35 p-4">
                {loading || featuredNews.length === 0 ? (
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center">
                        <p>{loading ? 'Memuat berita terbaru...' : 'Tidak ada berita untuk ditampilkan.'}</p>
                    </div>
                ) : (
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-4xl px-8 py-16 border border-gray-200">
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            navigation={true}
                            loop={true}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            className="w-full"
                        >
                            {featuredNews.map((slide) => (
                                <SwiperSlide key={slide.id}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 py-4">
                                        <div className="w-full h-64">
                                            <img
                                                src={`http://ict-backend.test/storage/${slide.thumbnail}`}
                                                alt={slide.title}
                                                className="w-full h-full object-cover rounded-lg shadow-md"
                                            />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-semibold text-purple-600 mb-2">Berita Terkini</p>
                                            <h1 className="text-3xl font-extrabold text-blue-900 mb-4 leading-tight">
                                                {slide.title}
                                            </h1>
                                            <p className="text-base text-gray-700 mb-6">
                                                {decodeHtmlEntities(slide.content.replace(/<[^>]+>/g, '').substring(0, 100))}...
                                            </p>
                                            <Link
                                                to={`/news/${slide.slug}`}
                                                className="inline-block px-6 py-3 bg-blue-800 hover:bg-blue-900 rounded-full text-white font-semibold shadow-md transition-transform duration-300 hover:scale-105"
                                            >
                                                Baca Selengkapnya
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </div>

            {/* 👇 UI Chat Floating */}
            <div className="fixed bottom-6 right-6 z-30">
                {isChatOpen ? (
                    <div className="bg-white shadow-lg rounded-xl w-80 h-96 flex flex-col border border-gray-200">
                        <div className="bg-blue-700 text-white px-4 py-3 rounded-t-xl flex justify-between items-center">
                            <span>Live Chat</span>
                            <button onClick={() => setIsChatOpen(false)} className="text-white font-bold">✕</button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-3 space-y-2">
                            {chatMessages.map((msg, idx) => (
                                <div key={idx} className={`text-sm px-3 py-2 rounded-xl max-w-xs ${msg.sender === 'user' ? 'bg-blue-100 self-end ml-auto' : 'bg-gray-200'}`}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="p-3 border-t flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Ketik pesan..."
                                className="flex-1 px-3 py-2 border rounded-lg text-sm"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button onClick={handleSendMessage} className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">Kirim</button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="w-14 h-14 bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-800 transition-all"
                        title="Buka Chat"
                    >
                        💬
                    </button>
                )}
            </div>
        </section>
    );
}

export default HomePage;
