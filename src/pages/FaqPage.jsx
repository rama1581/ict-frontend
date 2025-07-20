import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const faqData = [
  { question: 'Bagaimana cara mendapatkan akun email Taruna Bakti?', answer: 'Akun email akan dibuatkan secara otomatis saat Anda terdaftar sebagai siswa/staf. Silakan hubungi admin ICT untuk informasi login awal.' },
  { question: 'Apa yang harus saya lakukan jika lupa password?', answer: 'Anda bisa melakukan reset password melalui halaman login email atau datang langsung ke ruang ICT dengan membawa kartu identitas.' },
  { question: 'Jaringan WiFi mana yang harus saya gunakan?', answer: 'Gunakan jaringan WiFi dengan nama "TarunaBakti-Student" untuk siswa dan "TarunaBakti-Staff" untuk guru dan staf.' },
];

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-blue-900"
      >
        <span>{question}</span>
        <FaChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="mt-4 text-slate-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FaqPage = () => {
  // Menambahkan useEffect untuk mengatur judul tab
  useEffect(() => {
    document.title = 'FAQ - ICT Taruna Bakti';
  }, []);

  return (
    // Menghapus <Helmet> dan React Fragment (<>)
    <div className="bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl">
            Pertanyaan Umum (FAQ)
          </h1>
          <p className="mt-4 text-xl text-slate-600">
            Jawaban atas pertanyaan yang paling sering diajukan seputar layanan kami.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default FaqPage;