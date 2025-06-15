import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Server, Palette, BaselineIcon, PenTool as Tool,  Boxes  } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Skills: React.FC = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      icon: Code,
      title: t('skills.frontend'),
      skills: ['React', 'Vue.js', 'TypeScript', 'Laravel', 'Tailwind CSS','Bootstrap'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Server,
      title: t('skills.backend'),
      skills: ['Node.js','Express', 'Django', 'MySqli', 'MongoDB'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Boxes,
      title: t('skills.basic'),
      skills: ['Figma', 'Ms-Word', 'Ms-Excel', 'Power-Point', 'sheet', 'Capcut'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Tool,
      title: t('skills.tools'),
      skills: ['Git', 'Postman', 'draw.io'],
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('skills.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 cyberpunk:text-purple-400 ocean:text-blue-400">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white/10 dark:bg-gray-800/50 cyberpunk:bg-purple-800/50 ocean:bg-blue-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${category.color} mb-6`}>
                <category.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white cyberpunk:text-purple-100 ocean:text-blue-100">
                {category.title}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: (index * 0.1) + (skillIndex * 0.05) }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-700 dark:text-gray-300 cyberpunk:text-purple-300 ocean:text-blue-300">
                      {skill}
                    </span>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${80 + Math.random() * 20}%` } : {}}
                      transition={{ duration: 1, delay: (index * 0.1) + (skillIndex * 0.05) + 0.5 }}
                      className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ml-4 flex-1 max-w-20"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
    </section>
  );
};