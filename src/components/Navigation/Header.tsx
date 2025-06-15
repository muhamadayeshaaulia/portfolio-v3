import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Palette } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme, themes } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.skills', href: '#skills' },
    { key: 'nav.projects', href: '#projects' },
    { key: 'nav.contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false); // Tutup menu mobile dulu

    const target = document.querySelector(href);
    if (!target) return;

    const delay = window.innerWidth < 768 ? 300 : 0; // Delay jika mobile

    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth' });
    }, delay);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/10 dark:bg-gray-900/10 cyberpunk:bg-purple-900/10 ocean:bg-blue-900/10 backdrop-blur-md border-b border-white/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4 relative z-50">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Ayesha.dev
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 dark:text-gray-300 cyberpunk:text-purple-300 ocean:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t(item.key)}
              </motion.button>
            ))}
          </div>

          {/* Theme & Language (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/50 cyberpunk:bg-purple-800/50 ocean:bg-blue-800/50 backdrop-blur-sm"
              >
                <Palette className="w-5 h-5" />
              </motion.button>
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white/90 dark:bg-gray-800/90 cyberpunk:bg-purple-900/90 ocean:bg-blue-900/90 backdrop-blur-sm rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {themes.map((themeOption) => (
                  <button
                    key={themeOption.name}
                    onClick={() => setTheme(themeOption.name)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      theme === themeOption.name ? 'bg-blue-100 dark:bg-blue-900' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${themeOption.colors}`} />
                      <span>{themeOption.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative group">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/50 cyberpunk:bg-purple-800/50 ocean:bg-blue-800/50 backdrop-blur-sm"
              >
                <Globe className="w-5 h-5" />
              </motion.button>
              <div className="absolute right-0 mt-2 py-2 w-32 bg-white/90 dark:bg-gray-800/90 cyberpunk:bg-purple-900/90 ocean:bg-blue-900/90 backdrop-blur-sm rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button
                  onClick={() => setLanguage('en')}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    language === 'en' ? 'bg-blue-100 dark:bg-blue-900' : ''
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('id')}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    language === 'id' ? 'bg-blue-100 dark:bg-blue-900' : ''
                  }`}
                >
                  Indonesia
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/10 dark:bg-gray-800/50 cyberpunk:bg-purple-800/50 ocean:bg-blue-800/50 backdrop-blur-sm"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu Content */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 overflow-hidden rounded-lg bg-white/10 dark:bg-gray-900/10 cyberpunk:bg-purple-900/10 ocean:bg-blue-900/10 backdrop-blur-md"
              layout
            >
              <div className="flex flex-col space-y-4 px-4 py-4">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left px-4 py-2 hover:bg-white/10 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                  >
                    {t(item.key)}
                  </button>
                ))}

                <div className="border-t border-white/20 pt-4 space-y-2">
                  {/* Mobile Theme Select */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Theme</span>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value as any)}
                      className="bg-white/10 dark:bg-gray-800/50 rounded-lg px-2 py-1 text-sm"
                    >
                      {themes.map((themeOption) => (
                        <option key={themeOption.name} value={themeOption.name}>
                          {themeOption.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mobile Language Select */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Language</span>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as any)}
                      className="bg-white/10 dark:bg-gray-800/50 rounded-lg px-2 py-1 text-sm"
                    >
                      <option value="en">English</option>
                      <option value="id">Indonesia</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};
