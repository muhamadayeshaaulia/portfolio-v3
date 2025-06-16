import React from 'react';

/**
 * Komponen Resume untuk menampilkan resume dalam bentuk gambar.
 *
 * CATATAN PENTING:
 * Browser TIDAK DAPAT secara langsung mengekstrak halaman dari file PDF
 * untuk ditampilkan di tag <img>. Anda HARUS mengonversi setiap halaman
 * dari file PDF Anda (misalnya, "resume.pdf") menjadi file gambar terpisah
 * (misalnya, "resume-page-1.png", "resume-page-2.png", dst.) terlebih dahulu.
 *
 * Kemudian, tempatkan file-file gambar tersebut di folder 'public/pdf' proyek Anda.
 * Kode ini akan menampilkan gambar-gambar yang sudah dikonversi tersebut.
 */
const Resume = () => {
  // Ganti URL placeholder ini dengan path ke file gambar aktual dari halaman PDF resume Anda.
  // Contoh: Jika Anda telah mengonversi "resume.pdf" menjadi "resume-page-1.png",
  // dan menyimpannya di folder 'public/pdf', maka path-nya adalah "/pdf/resume-page-1.png".
  const resumeImageUrls = [
    "https://muhamadayeshaaulia.github.io/portfolio-v3/pdf/cv.pdf", // Asumsi Anda memiliki file ini di public/pdf
  ];

  return (
    <section id="resume" className="py-16 px-6 md:px-12 text-center rounded-lg shadow-lg m-8">
      <h2 className="text-3xl font-bold mb-8 rounded-md">My Resume</h2>
      <div className="max-w-4xl mx-auto space-y-8 rounded-md">
        {/* Iterasi melalui daftar URL gambar resume dan tampilkan setiap gambar */}
        {resumeImageUrls.map((imageUrl, index) => (
          <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md flex justify-center items-center">
            <img
              src={imageUrl}
              alt={`Resume Page ${index + 1}`}
              className="max-w-full h-auto border-2 border-gray-300 dark:border-gray-700 rounded-md shadow-lg"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                // Menangani kesalahan pemuatan gambar.
                // Mengatur 'onerror' ke null mencegah loop tak terbatas jika gambar placeholder juga gagal dimuat.
                target.onerror = null;
                // Mengatur 'src' ke gambar placeholder atau pesan kesalahan jika gambar asli gagal dimuat.
                target.src = `https://placehold.co/800x1100/FF0000/FFFFFF?text=Error+Loading+Page+${index + 1}`;
              }}
            />
          </div>
        ))}
        <p className="text-lg mt-8 rounded-md">
          Anda bisa melihat resume lengkap saya di atas.
          Jika Anda ingin mengunduh, Anda bisa menambahkan tautan unduhan PDF di sini.
        </p>
        {/* Tombol unduh PDF - Ganti href dengan path ke file PDF Anda yang sebenarnya (misal: /pdf/my-resume.pdf) */}
        <a
          href="https://muhamadayeshaaulia.github.io/portfolio-v3/pdf/cv.pdf" // Ganti dengan path ke file PDF Anda di folder public/pdf
          download="cv.pdf"
          className="inline-block mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors shadow-lg"
        >
          Download Resume (PDF)
        </a>
      </div>
    </section>
  );
};

export default Resume;