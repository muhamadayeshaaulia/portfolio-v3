import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const projects = [
    {
      title: 'Arisan-App',
      description:
        'Modern Arisan applications make it easy for administrators and participants to manage and register for Arisan, and notifications of winners are sent directly to the active Gmail of registered participants.',
      image: 'https://github.com/muhamadayeshaaulia/portfolio-v3/blob/main/public/project/arisanmantep.jpg',
      tech: ['Laravel', 'Inertia.js', 'React.js', 'Tailwind'],
      demo: 'https://vt.tiktok.com/ZSkXGve2K/',
      code: 'https://github.com/muhamadayeshaaulia?tab=repositories',
    },
    {
      title: 'Absensi-sekolah-Scan-QR',
      description:
        'Student and teacher attendance makes it easier for schools to manage the attendance list of students and teachers by using QR scan technology.',
      image: 'https://muhamadayeshaaulia.github.io/project/absen.jpg',
      tech: ['CodeIgniter4', 'Bootstrap', 'API WhatsApp', 'Mysql', 'QRcode-Generator'],
      demo: 'https://vt.tiktok.com/ZSkXGVeGm/',
      code: 'https://github.com/muhamadayeshaaulia?tab=repositories',
    },
    {
      title: 'Angkringan-Management & Kasir ',
      description:
        'Management of product goods and stock as well as transactions with product search using qr-code and availability of tables to be reserved',
      image: 'https://muhamadayeshaaulia.github.io/project/angkringan2.jpg',
      tech: ['Laravel', 'Inertia.js', 'Vue.js', 'Bootstrap', 'SweetAlert2', 'QR-Generator'],
      demo: 'https://vt.tiktok.com/ZSkXGwm4X/',
      code: 'https://github.com/muhamadayeshaaulia?tab=repositories',
    },
    {
      title: 'Chat-App',
      description:
        'A real-time chat application using MongoDB API and Socket.io integration to connect data online, this application is still under development. If you are interested in contributing, you can contact me.',
      image: 'https://muhamadayeshaaulia.github.io/project/chat.jpg',
      tech: ['MongoDB', 'Express', 'React.js', 'Node.js', 'DaisyUI', 'tailwind', 'Socket.io'],
      demo: 'https://vt.tiktok.com/ZSkXGwm4X/',
      code: 'https://github.com/muhamadayeshaaulia/chat-app',
    },
  ];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() => openModal(project.image)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-600/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <motion.a
                    href={project.demo}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{t('projects.viewDemo')}</span>
                  </motion.a>
                  <motion.a
                    href={project.code}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>{t('projects.viewCode')}</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-3xl w-full px-4"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-red-500 transition"
              >
                <X size={32} />
              </button>
              <img
                src={selectedImage}
                alt="Project Preview"
                className="w-full max-h-[80vh] object-contain rounded-lg shadow-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Dekorasi */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
    </section>
  );
};
