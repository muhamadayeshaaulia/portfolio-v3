import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: 'Yakin ingin mengirim pesan ini?',
      text: 'Pesan akan dikirim ke Ayesha.dev.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, kirim!',
      cancelButtonText: 'Batal',
    });

    if (!confirm.isConfirmed) return;

    Swal.fire({
      title: 'Mengirim...',
      text: 'Harap tunggu sebentar.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const response = await fetch('https://formspree.io/f/xzzgggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          title: 'Berhasil!',
          text: 'Pesan berhasil dikirim.',
          icon: 'success',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        Swal.fire({
          title: 'Gagal!',
          text: 'Pesan gagal dikirim. Coba lagi.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Terjadi Kesalahan!',
        text: 'Tidak dapat mengirim pesan. Periksa koneksi Anda.',
        icon: 'error',
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'shaxyyy.03@gmail.com',
      href: 'mailto:shaxyyy.03@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+62 851-7414-5156',
      href: 'https://wa.me/6285174145156',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: t('footer.location'),
      href: '#',
    },
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 cyberpunk:text-purple-400 ocean:text-blue-400">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 cyberpunk:text-purple-300 ocean:text-blue-300 mb-2">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/50 cyberpunk:bg-purple-800/50 ocean:bg-blue-800/50 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 cyberpunk:text-purple-300 ocean:text-blue-300 mb-2">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/50 cyberpunk:bg-purple-800/50 ocean:bg-blue-800/50 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 cyberpunk:text-purple-300 ocean:text-blue-300 mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/50 cyberpunk:bg-purple-800/50 ocean:bg-blue-800/50 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Send className="w-5 h-5" />
                <span>{t('contact.send')}</span>
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white cyberpunk:text-purple-100 ocean:text-blue-100">
                {t('contact.info')}
              </h3>
            </div>

            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center space-x-4 p-6 bg-white/10 dark:bg-gray-800/50 cyberpunk:bg-purple-800/50 ocean:bg-blue-800/50 backdrop-blur-sm rounded-xl border border-white/20 hover:shadow-lg transition-all"
              >
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 cyberpunk:text-purple-400 ocean:text-blue-400">
                    {info.label}
                  </div>
                  <div className="text-lg font-medium text-gray-900 dark:text-white cyberpunk:text-purple-100 ocean:text-blue-100">
                    {info.value}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background blur elements */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
    </section>
  );
};
