import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'id';

// Perbarui interface LanguageContextType agar t menerima 'options'
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: { [key: string]: any }) => string; // Menambahkan 'options'
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Objek terjemahan lengkap yang menggabungkan terjemahan portofolio dan komentar
// Perhatikan bagaimana 'resume.error_loading_page' dan 'resume.alt_page' sekarang berupa fungsi
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.resume' : 'Resume',

    // Hero Section
    'hero.greeting': 'Hello, I\'m',
    'hero.title': 'Full Stack Developer',
    'hero.description': 'I am a student from the Global Institute majoring in information technology, focusing on website and other software development.',
    'hero.cta': 'View My Work',
    'hero.contact': 'Get In Touch',

    // About Section
    'about.title': 'About Me',
    'about.subtitle': 'Passionate Developer & Designer',
    'about.description': 'With over 4 years of experience in web development, I specialize in creating innovative solutions that blend beautiful design with powerful functionality. I\'m passionate about crafting digital experiences that make a difference.',
    'about.experience': 'Years Experience',
    'about.projects': 'Projects Completed',
    'about.clients': 'Happy Clients',

    // Skills Section
    'skills.title': 'Skills & Expertise',
    'skills.subtitle': 'Technologies I Work With',
    'skills.frontend': 'Frontend Development',
    'skills.backend': 'Backend Development',
    'skills.design': 'UI/UX Design',
    'skills.tools': 'Tools & Others',

    // Projects Section
    'projects.title': 'Top Project',
    'projects.subtitle': 'Some of my recent work',
    'projects.viewDemo': 'View Demo',
    'projects.viewCode': 'View Code',

    // Contact Section
    'contact.title': 'Let\'s Work Together',
    'contact.subtitle': 'Ready to bring your ideas to life',
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.info': 'Contact Information',

    // Footer
    'footer.rights': 'All rights reserved',
    'footer.made': 'Made with',
    'footer.location': 'Jakarta, Indonesia',

    // Comments Section (New additions for the Comments component)
    'comments.title': 'Comments',
    'comments.subtitle': 'Share your thoughts and feedback!',
    'form.name_label': 'Your Name:',
    'form.name_placeholder': 'Enter your name',
    'form.comment_label': 'Your Comment:',
    'form.comment_placeholder': 'Share your thoughts...',
    'form.submit_button': 'Submit Comment',
    'form.submitting_button': 'Submitting...',
    'form.generating_user_id': 'Generating user ID...',
    'comments_list.title': 'Recent Comments',
    'comments_list.loading': 'Loading comments...',
    'comments_list.no_comments': 'No comments yet. Be the first to share your thoughts!',
    'swal.input_incomplete_title': 'Incomplete Input!',
    'swal.input_incomplete_text': 'Name and comment cannot be empty.',
    'swal.confirm_send_title': 'Confirm to send this comment?',
    'swal.confirm_send_text': 'Your comment will be published.',
    'swal.confirm_send_confirm_button': 'Yes, send!',
    'swal.confirm_send_cancel_button': 'Cancel',
    'swal.sending_comment_title': 'Sending Comment...',
    'swal.sending_comment_text': 'Please wait a moment.',
    'swal.success_title': 'Success!',
    'swal.success_text': 'Comment successfully sent.',
    'swal.failed_title': 'Failed!',
    'swal.failed_text': 'Failed to send comment. Please try again.',
    'swal.error_fetch_comments_title': 'Failed to Load Comments!',
    'swal.error_fetch_comments_text': 'An error occurred while loading comments.',
    'swal.not_ready_for_like': 'Like system not ready yet. Please try again shortly.',
    'swal.failed_like_text': 'Failed to update like. Please try again.',

    // Resume Section
    'resume.title': 'My Resume',
    'resume.description': 'You can view my complete resume above.',
    'resume.download_prompt': 'If you wish to download, you can add a PDF download link here.',
    'resume.download_button': 'Download Resume (PDF)',
    'resume.alt_page': (options: { page: number }) => `Resume Page ${options.page}`,
    'resume.prev_page_button': 'Previous Page',
    'resume.next_page_button': 'Next Page',
    'resume.error_loading_page': (options: { page: number }) => `Error Loading Page ${options.page}`
  },
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.skills': 'Keahlian',
    'nav.projects': 'Proyek',
    'nav.contact': 'Kontak',
    'nav.resume' : 'Data Diri',

    // Hero Section
    'hero.greeting': 'Halo, Saya',
    'hero.title': 'Full Stack Developer',
    'hero.description': 'saya adalah mahasiswa dari Global Institute jurusan teknik informatika yang berfokus pada pengembangan website dan perangkat lunak lainnya.',
    'hero.cta': 'Lihat Karya Saya',
    'hero.contact': 'Hubungi Saya',

    // About Section
    'about.title': 'Tentang Saya',
    'about.subtitle': 'Developer & Designer Berpengalaman',
    'about.description': 'Dengan pengalaman lebih dari 4 tahun dalam pengembangan web, saya mengkhususkan diri dalam menciptakan solusi inovatif yang memadukan desain indah dengan fungsionalitas yang kuat. Saya bersemangat menciptakan pengalaman digital yang membuat perbedaan.',
    'about.experience': 'Tahun Pengalaman',
    'about.projects': 'Proyek Selesai',
    'about.clients': 'Klien Puas',

    // Skills Section
    'skills.title': 'Keahlian & Expertise',
    'skills.subtitle': 'Teknologi yang Saya Kuasai',
    'skills.frontend': 'Pengembangan Frontend',
    'skills.backend': 'Pengembangan Backend',
    'skills.design': 'Desain UI/UX',
    'skills.tools': 'Alat & Lainnya',

    // Projects Section
    'projects.title': 'Proyek Unggulan',
    'projects.subtitle': 'Beberapa karya terbaru saya',
    'projects.viewDemo': 'Lihat Demo',
    'projects.viewCode': 'Lihat Kode',

    // Contact Section
    'contact.title': 'Mari Bekerja Sama',
    'contact.subtitle': 'Siap mewujudkan ide Anda',
    'contact.name': 'Nama Anda',
    'contact.email': 'Email Anda',
    'contact.message': 'Pesan Anda',
    'contact.send': 'Kirim Pesan',
    'contact.info': 'Informasi Kontak',

    // Footer
    'footer.rights': 'Hak cipta dilindungi',
    'footer.made': 'Dibuat dengan',
    'footer.location': 'Jakarta, Indonesia',

    // Comments Section (New additions for the Comments component)
    'comments.title': 'Komentar',
    'comments.subtitle': 'Bagikan pemikiran dan masukan Anda!',
    'form.name_label': 'Nama Anda:',
    'form.name_placeholder': 'Masukkan nama Anda',
    'form.comment_label': 'Komentar Anda:',
    'form.comment_placeholder': 'Bagikan pemikiran Anda...',
    'form.submit_button': 'Kirim Komentar',
    'form.submitting_button': 'Mengirim...',
    'form.generating_user_id': 'Membuat ID pengguna...',
    'comments_list.title': 'Komentar Terbaru',
    'comments_list.loading': 'Memuat komentar...',
    'comments_list.no_comments': 'Belum ada komentar. Jadilah yang pertama berbagi!',
    'swal.input_incomplete_title': 'Input Tidak Lengkap!',
    'swal.input_incomplete_text': 'Nama dan komentar tidak boleh kosong.',
    'swal.confirm_send_title': 'Yakin ingin mengirim komentar ini?',
    'swal.confirm_send_text': 'Komentar Anda akan dipublikasikan.',
    'swal.confirm_send_confirm_button': 'Ya, kirim!',
    'swal.confirm_send_cancel_button': 'Batal',
    'swal.sending_comment_title': 'Mengirim Komentar...',
    'swal.sending_comment_text': 'Harap tunggu sebentar.',
    'swal.success_title': 'Berhasil!',
    'swal.success_text': 'Komentar berhasil dikirim.',
    'swal.failed_title': 'Gagal!',
    'swal.failed_text': 'Komentar gagal dikirim. Coba lagi.',
    'swal.error_fetch_comments_title': 'Gagal Memuat Komentar!',
    'swal.error_fetch_comments_text': 'Terjadi kesalahan saat memuat komentar.',
    'swal.not_ready_for_like': 'Sistem suka belum siap. Silakan coba lagi sebentar.',
    'swal.failed_like_text': 'Gagal memperbarui suka. Silakan coba lagi.',

    // Resume Section
    'resume.title': 'Resume Saya',
    'resume.description': 'Anda dapat melihat resume lengkap saya di atas.',
    'resume.download_prompt': 'Jika Anda ingin mengunduh, Anda dapat menambahkan tautan unduhan PDF di sini.',
    'resume.download_button': 'Unduh Resume (PDF)',
    'resume.alt_page': (options: { page: number }) => `Halaman Resume ${options.page}`,
    'resume.prev_page_button': 'Halaman Sebelumnya',
    'resume.next_page_button': 'Halaman Selanjutnya',
    'resume.error_loading_page': (options: { page: number }) => `Gagal Memuat Halaman ${options.page}`
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Perbarui implementasi fungsi t untuk menangani 'options'
  const t = (key: string, options?: { [key: string]: any }): string => {
    // Dapatkan terjemahan untuk kunci dan bahasa saat ini
    const translation = (translations[language] as any)[key]; // 'as any' sementara untuk mengatasi kompleksitas tipe

    // Jika terjemahan adalah fungsi (untuk terjemahan dinamis)
    if (typeof translation === 'function') {
      return translation(options || {}); // Panggil fungsi dengan opsi
    }

    // Jika terjemahan adalah string
    return (translation as string) || key; // Kembali ke kunci jika tidak ditemukan
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
