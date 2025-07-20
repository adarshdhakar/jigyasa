import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import schoolBg from '../images/image1.jpeg';

const AdminAddSchool = () => {
  const { t } = useTranslation();

  const [schoolData, setSchoolData] = useState({
    name: '',
    address: '',
    contact: {
      email: '',
      phone: '',
    },
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email' || name === 'phone') {
      setSchoolData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [name]: value,
        },
      }));
    } else {
      setSchoolData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, address, contact } = schoolData;

    if (!name || !address || !contact.email || !contact.phone) {
      setMessage({ type: 'error', text: t('add_school.fill_all_fields') });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/school/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schoolData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: t('add_school.success') });
        setSchoolData({
          name: '',
          address: '',
          contact: { email: '', phone: '' },
        });
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data?.error || t('add_school.failed') });
      }
    } catch (error) {
      console.error('Error adding school:', error);
      setMessage({ type: 'error', text: t('add_school.error') });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat relative p-4"
      style={{ backgroundImage: `url(${schoolBg})` }}
    >
      <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 bg-white dark:bg-gray-900 border border-blue-100 dark:border-blue-800 shadow-xl rounded-xl px-10 py-8 w-full max-w-lg transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-300 mb-6">
          {t('add_school.title')}
        </h2>

        {message.text && (
          <div
            className={`mb-4 p-3 rounded-md text-center font-medium transition-all ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100'
                : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-lg font-semibold text-blue-700 dark:text-blue-200 mb-1">
              {t('add_school.name_label')}
            </label>
            <input
              type="text"
              name="name"
              value={schoolData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-300 dark:border-blue-600 rounded-md focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 text-blue-900 dark:text-blue-100 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder={t('add_school.name_placeholder')}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-blue-700 dark:text-blue-200 mb-1">
              {t('add_school.address_label')}
            </label>
            <input
              type="text"
              name="address"
              value={schoolData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-300 dark:border-blue-600 rounded-md focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 text-blue-900 dark:text-blue-100 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder={t('add_school.address_placeholder')}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-blue-700 dark:text-blue-200 mb-1">
              {t('add_school.email_label')}
            </label>
            <input
              type="email"
              name="email"
              value={schoolData.contact.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-300 dark:border-blue-600 rounded-md focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 text-blue-900 dark:text-blue-100 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder={t('add_school.email_placeholder')}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-blue-700 dark:text-blue-200 mb-1">
              {t('add_school.phone_label')}
            </label>
            <input
              type="tel"
              name="phone"
              value={schoolData.contact.phone}
              onChange={handleChange}
              required
              pattern="\d{10}"
              className="w-full px-4 py-2 border border-blue-300 dark:border-blue-600 rounded-md focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 text-blue-900 dark:text-blue-100 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder={t('add_school.phone_placeholder')}
            />
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
            >
              {t('add_school.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddSchool;
