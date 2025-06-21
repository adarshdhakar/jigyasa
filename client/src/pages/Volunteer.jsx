import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

export default function Volunteer() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    availability: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/volunteer-hero.jpg"
        alt="Volunteer"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        style={{ filter: 'brightness(0.6) blur(1px)' }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-70 z-10" />
      {/* Content */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center py-16 px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-white text-center mb-10 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t('volunteer_heading', 'Become a Volunteer')}
        </motion.h1>
        <div className="max-w-3xl w-full mx-auto bg-white/10 dark:bg-gray-800/40 rounded-3xl shadow-2xl px-8 py-10 md:p-12 text-gray-800 dark:text-white backdrop-blur-md">
          {submitted ? (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">
                {t('volunteer_thanks', 'Thank you for volunteering!')}
              </h2>
              <p>{t('volunteer_response_text', 'We’ll reach out to you shortly with more information.')}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 font-medium text-gray-400">{t('name')}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-xl bg-gray-100/20 dark:bg-gray-700/20 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-400">{t('email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-xl bg-gray-100/20 dark:bg-gray-700/20 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 font-medium text-gray-400">{t('phone')}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-xl bg-gray-100/20 dark:bg-gray-700/20 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-400">{t('skills')}</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder={t('skills_placeholder', 'e.g. First Aid, Logistics')}
                    className="w-full px-4 py-2 rounded-xl bg-gray-100/20 dark:bg-gray-700/20 border border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-400">{t('availability')}</label>
                <input
                  type="text"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  placeholder={t('availability_placeholder', 'Weekends, Evenings, etc.')}
                  className="w-full px-4 py-2 rounded-xl bg-gray-100/20 dark:bg-gray-700/20 border border-gray-300 dark:border-gray-600"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold text-white bg-blue-500 shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition
                    dark:from-indigo-600 dark:to-blue-700 dark:hover:from-indigo-700 dark:hover:to-blue-800"
                >
                  {t('submit')}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}