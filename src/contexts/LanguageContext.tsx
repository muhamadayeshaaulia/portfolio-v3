import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    
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
  },
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.skills': 'Keahlian',
    'nav.projects': 'Proyek',
    'nav.contact': 'Kontak',
    
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
    'skills.frontend': 'Frontend Development',
    'skills.backend': 'Backend Development',
    'skills.design': 'UI/UX Design',
    'skills.tools': 'Tools & Lainnya',
    
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
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
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