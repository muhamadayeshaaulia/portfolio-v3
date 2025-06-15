import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, Briefcase } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      icon: Briefcase,
      number: '4+',
      label: t('about.experience'),
    },
    {
      icon: Award,
      number: '15+',
      label: t('about.projects'),
    },
    {
      icon: Users,
      number: '15+',
      label: t('about.clients'),
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 cyberpunk:text-purple-400 ocean:text-blue-400">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="prose prose-lg dark:prose-invert cyberpunk:prose-purple ocean:prose-blue max-w-none">
              <p className="text-gray-700 dark:text-gray-300 cyberpunk:text-purple-300 ocean:text-blue-300 leading-relaxed mb-8">
                {t('about.description')}
              </p>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['React', 'TypeScript', 'Vue.js', 'Tailwind','Bootsrap', 'Laravel', 'Mysql', 'Node.js', 'MongoDB','Express'].map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-white/10 dark:bg-gray-800/50 cyberpunk:bg-purple-800/50 ocean:bg-blue-800/50 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 dark:bg-gray-800/50 cyberpunk:bg-purple-800/50 ocean:bg-blue-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white cyberpunk:text-purple-100 ocean:text-blue-100">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 cyberpunk:text-purple-400 ocean:text-blue-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
    </section>
  );
};