import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/muhamadayeshaaulia', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/muhamad-ayesha-aulia-549623349?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ', label: 'LinkedIn' },
    {
    icon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="currentColor"
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M41,16.3c-2.6,0-5-0.8-7-2.2v11.3c0,8.7-5.3,15.6-14.8,15.6c-3.1,0-6.3-0.9-8.8-2.6c-3-2-4.5-5.1-4.5-9.2 c0-6.6,4.9-11.9,11.5-12.5c1.2-0.1,2.2,0.9,2.2,2.1v4.6c0,1.2-1,2.1-2.2,2.2c-1.3,0.1-2.4,0.6-3.3,1.4c-1,0.9-1.5,2.1-1.5,3.5 c0,2.1,1.3,3.5,3.3,3.5c4.2,0,6.5-3.3,6.5-8.7V4h5.6c0.4,3.6,3.4,6.4,7,6.6V16.3z" />
      </svg>
    ),
    href: 'https://www.tiktok.com/@programmer_amatir?_t=ZS-8xEF7RQIZ29&_r=1',
    label: 'TikTok',
  },
  ];

  return (
    <footer className="py-12 relative overflow-hidden border-t border-white/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
          >
            Muhamad Ayesha Aulia
          </motion.div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/10 dark:bg-gray-800/50 cyberpunk:bg-purple-800/50 ocean:bg-blue-800/50 backdrop-blur-sm rounded-full hover:bg-blue-600 hover:text-white transition-all"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-gray-600 dark:text-gray-400 cyberpunk:text-purple-400 ocean:text-blue-400">
            <div className="flex items-center space-x-2">
              <span>© {new Date().getFullYear()} Muhamad Ayesha Aulia.</span>
              <span>{t('footer.rights')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>{t('footer.made')}</span>
              <motion.img
                src="https://muhamadayeshaaulia.github.io/images/react.png"
                alt="React Logo"
                className="w-6 h-6"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
              />
              <span>in {t('footer.location')}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Element */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
    </footer>
  );
};
