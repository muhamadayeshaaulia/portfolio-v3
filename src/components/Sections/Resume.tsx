import React, { useState } from 'react'; // Import useState
import { motion, AnimatePresence } from 'framer-motion'; // Import motion dan AnimatePresence
import { useLanguage } from '../../contexts/LanguageContext'; // Pastikan jalur ini benar
// Import useTheme yang baru
import { useTheme } from '../../contexts/ThemeContext'; // Pastikan jalur ini benar

/**
 * Komponen Resume untuk menampilkan resume dalam bentuk gambar dengan animasi membalik halaman buku.
 *
 * CATATAN PENTING:
 * Browser TIDAK DAPAT secara langsung mengekstrak halaman dari file PDF
 * untuk ditampilkan di tag <img>. Anda HARUS mengonversi setiap halaman
 * dari file PDF Anda (misalnya, "cv.pdf") menjadi file gambar terpisah
 * (misalnya, "cv-page-1.png", "cv-page-2.png", dst.) terlebih dahulu.
 *
 * Kemudian, tempatkan file-file gambar tersebut di folder 'public/pdf' proyek Anda.
 * Kode ini akan menampilkan gambar-gambar yang sudah dikonversi tersebut.
 */
const Resume = () => {
  const { t } = useLanguage(); // Gunakan hook useLanguage untuk mendapatkan fungsi terjemahan 't'
  // Gunakan hook useTheme untuk mendapatkan tema saat ini
  const { theme } = useTheme();

  // Ganti URL placeholder ini dengan path ke file gambar aktual dari halaman PDF resume Anda.
  // Contoh: Jika Anda telah mengonversi "cv.pdf" menjadi "cv-page-1.png",
  // dan menyimpannya di folder 'public/pdf', maka path-nya adalah "/pdf/cv-page-1.png".
  const resumeImageUrls = [
    // Pastikan ini adalah PATH KE FILE GAMBAR (e.g., .png, .jpg), BUKAN .pdf
    "https://muhamadayeshaaulia.github.io/portfolio-v3/pdf/cv1.jpg", // Asumsi Anda memiliki file ini di public/pdf setelah konversi
    "https://muhamadayeshaaulia.github.io/portfolio-v3/pdf/cv2.jpg", // Tambahkan ini jika cv Anda punya halaman kedua yang sudah dikonversi
    "https://muhamadayeshaaulia.github.io/portfolio-v3/pdf/cv3.jpg", // Tambahkan lebih banyak path jika cv Anda memiliki lebih banyak halaman
  ];

  // State untuk melacak halaman yang sedang ditampilkan
  const [currentPage, setCurrentPage] = useState(0);
  // State untuk melacak arah (digunakan untuk animasi)
  const [direction, setDirection] = useState(0); // 0: tidak ada, 1: maju, -1: mundur

  // Fungsi untuk maju ke halaman berikutnya
  const handleNextPage = () => {
    setDirection(1);
    setCurrentPage((prevPage) =>
      prevPage === resumeImageUrls.length - 1 ? 0 : prevPage + 1
    );
  };

  // Fungsi untuk mundur ke halaman sebelumnya
  const handlePrevPage = () => {
    setDirection(-1);
    setCurrentPage((prevPage) =>
      prevPage === 0 ? resumeImageUrls.length - 1 : prevPage - 1
    );
  };

  // Varian animasi untuk transisi halaman
  const pageVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90, // Halaman baru dimulai terlipat
      opacity: 0,
      scale: 0.9,
      // transformOrigin diatur di sini untuk rotasi yang realistis
      transformOrigin: direction > 0 ? 'left center' : 'right center',
      zIndex: 1 // Halaman yang masuk awalnya di atas
    }),
    center: {
      rotateY: 0, // Halaman tengah (saat aktif) tidak berputar
      opacity: 1,
      scale: 1,
      transformOrigin: 'center center', // Asal rotasi di tengah saat statis
      zIndex: 0 // Halaman tengah di belakang halaman yang beranimasi
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -90 : 90, // Halaman keluar berputar menjauh
      opacity: 0,
      scale: 0.9,
      // transformOrigin diatur di sini untuk rotasi yang realistis
      transformOrigin: direction > 0 ? 'right center' : 'left center',
      zIndex: 2 // Halaman yang keluar di atas halaman yang masuk
    })
  };

  // Varian transisi
  const pageTransition = {
    rotateY: { type: "spring", stiffness: 300, damping: 30, duration: 0.6 },
    opacity: { duration: 0.4 },
    scale: { duration: 0.4 }
  };

  return (
    <section id="resume" className="py-16 px-6 md:px-12 text-center rounded-lg shadow-lg m-8">
      {/* Judul yang responsif */}
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-8 rounded-md ${theme === 'cyberpunk' ? 'text-neon-pink' : 'text-primary-heading'}`}>
        {t('resume.title')} {/* Menggunakan kunci terjemahan 'resume.title' */}
      </h2>
      {/* Container utama untuk animasi buku: responsif dan menjaga rasio aspek */}
      {/* Gunakan max-w-sm untuk mobile, dan tingkatkan secara bertahap */}
      <div className="relative mx-auto w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-3xl"
           style={{ paddingTop: '100%', perspective: '1200px' }}>{/* Rasio aspek A4 portrait (tinggi/lebar), 29.7cm/21cm */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentPage} // Kunci unik untuk setiap halaman agar AnimatePresence berfungsi
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            className="absolute inset-0 flex justify-center items-center"
            style={{ transformStyle: 'preserve-3d' }} // Penting untuk efek 3D
          >
            {/* 'backface-visibility: hidden' mencegah sisi belakang terlihat saat membalik */}
            <div className={`p-4 rounded-lg shadow-md flex justify-center items-center w-full h-full ${theme === 'light' ? 'bg-gray-100' : theme === 'dark' ? 'bg-gray-800' : theme === 'cyberpunk' ? 'bg-purple-950' : 'bg-blue-950'}`} style={{ backfaceVisibility: 'hidden' }}>
              <img
                src={resumeImageUrls[currentPage]} // Tampilkan gambar halaman saat ini
                alt={t('resume.alt_page', { page: currentPage + 1 })}
                className={`w-full h-full object-contain rounded-md shadow-lg ${theme === 'light' ? 'border-2 border-gray-300' : theme === 'dark' ? 'border-2 border-gray-700' : theme === 'cyberpunk' ? 'border-2 border-neon-blue' : 'border-2 border-ocean-blue'}`} // Pastikan gambar mengisi container
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = `https://placehold.co/800x1100/FF0000/FFFFFF?text=${t('resume.error_loading_page', { page: currentPage + 1 })}`;
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tombol Navigasi - Pastikan z-index lebih tinggi dari gambar */}
        <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center z-20 px-2 sm:px-4"> {/* Kurangi padding horizontal untuk mobile */}
          <button
            onClick={handlePrevPage}
            className={`p-2 sm:p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 transition-colors ${theme === 'light' ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500' : theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500' : theme === 'cyberpunk' ? 'bg-neon-blue text-black hover:bg-neon-pink focus:ring-neon-pink' : 'bg-ocean-dark text-white hover:bg-ocean-light focus:ring-ocean-accent'}`}
            aria-label={t('resume.prev_page_button')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNextPage}
            className={`p-2 sm:p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 transition-colors ${theme === 'light' ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500' : theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500' : theme === 'cyberpunk' ? 'bg-neon-blue text-black hover:bg-neon-pink focus:ring-neon-pink' : 'bg-ocean-dark text-white hover:bg-ocean-light focus:ring-ocean-accent'}`}
            aria-label={t('resume.next_page_button')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      {/* Konten di bawah animasi sekarang akan secara otomatis diposisikan dengan benar karena parent memiliki tinggi */}
      <p className={`text-lg mt-8 rounded-md ${theme === 'light' ? 'text-gray-800' : theme === 'dark' ? 'text-gray-200' : theme === 'cyberpunk' ? 'text-neon-green' : 'text-ocean-light'}`}>
        {t('resume.description')}
        <br />
        {t('resume.download_prompt')}
      </p>
      {/* Tombol unduh PDF - Menggunakan URL PDF yang Anda berikan */}
      <a
        href="https://muhamadayeshaaulia.github.io/portfolio-v3/pdf/cv.pdf"
        download="cv.pdf"
        className={`inline-block mt-4 px-6 py-3 font-semibold rounded-md transition-colors shadow-lg ${theme === 'light' ? 'bg-green-600 text-white hover:bg-green-700' : theme === 'dark' ? 'bg-green-600 text-white hover:bg-green-700' : theme === 'cyberpunk' ? 'bg-neon-pink text-black hover:bg-neon-blue' : 'bg-ocean-accent text-white hover:bg-blue-600'}`}
      >
        {t('resume.download_button')}
      </a>
    </section>
  );
};

export default Resume;