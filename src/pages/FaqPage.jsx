import React, { useState, useEffect } from 'react'; // <-- Perbaikan di sini
import { FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  { question: 'Bagaimana cara mendapatkan akun email Taruna Bakti?', answer: 'Akun email akan dibuatkan secara otomatis saat Anda terdaftar sebagai siswa/staf. Silakan hubungi admin ICT untuk informasi login awal.' },
  { question: 'Apa yang harus saya lakukan jika lupa password?', answer: 'Anda bisa melakukan reset password melalui halaman login email atau datang langsung ke ruang ICT dengan membawa kartu identitas.' },
  { question: 'Jaringan WiFi mana yang harus saya gunakan?', answer: 'Gunakan jaringan WiFi dengan nama "TarunaBakti-Student" untuk siswa dan "TarunaBakti-Staff" untuk guru dan staf.' },
];

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-6">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-blue-900"
        whileHover={{ color: '#4f46e5' }}
      >
        <span className="flex-1 pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="text-indigo-500" />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-slate-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FaqPage = () => {
  useEffect(() => {
    document.title = 'FAQ - ICT Taruna Bakti';
  }, []);

  return (
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
        
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default FaqPage;