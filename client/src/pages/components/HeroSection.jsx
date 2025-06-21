// src/pages/components/HeroSection.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/Button';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative text-center px-4 pt-10 pb-20 ">
      <img
        src="/images/disaster-relief.jpg"
        alt="Disaster relief"
        className="absolute inset-0 w-full h-full object-cover opacity-70 dark:opacity-30"
      />
      <div className="relative z-10">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t('hero_title')}
        </motion.h2>
        <motion.p
          className="max-w-2xl mx-auto text-lg md:text-xl mb-8 font-semibold dark:font-normal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t('hero_subtitle')}
        </motion.p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/relief-centers"><Button>{t('explore_centers')}</Button></Link>
          {/* <Link to="/donate"><Button variant="secondary">{t('donate_now')}</Button></Link> */}
          <Link to="/becomevolunteer"><Button>{t('volunteer')}</Button></Link>
        </div>
      </div>
    </section>
  );
}
