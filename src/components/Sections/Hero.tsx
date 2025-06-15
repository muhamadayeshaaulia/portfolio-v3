import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10"><br /><br/><br />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 cyberpunk:text-purple-400 ocean:text-blue-400 mb-4"
          >
            {t('hero.greeting')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Muhamad Ayesha Aulia
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300 cyberpunk:text-purple-300 ocean:text-blue-300 mb-8"
          >
            {t('hero.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 cyberpunk:text-purple-400 ocean:text-blue-400 mb-12 max-w-2xl mx-auto"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              {t('hero.cta')}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all"
            >
              {t('hero.contact')}
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex justify-center space-x-6 mb-16"
          >
            {[
              { icon: Github, href: 'https://github.com/muhamadayeshaaulia', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/muhamad-ayesha-aulia-549623349?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
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
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/10 dark:bg-gray-800/50 cyberpunk:bg-purple-800/50 ocean:bg-blue-800/50 backdrop-blur-sm rounded-full hover:bg-blue-600 hover:text-white transition-all"
                aria-label={label}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
              <br />
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          whileHover={{ y: 5 }}
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <ArrowDown className="w-8 h-8 text-gray-600 dark:text-gray-400" />
        </motion.button>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20 dark:via-gray-900/5 dark:to-gray-900/20 cyberpunk:via-purple-900/5 cyberpunk:to-purple-900/20 ocean:via-blue-900/5 ocean:to-blue-900/20" />
    </section>
  );
};