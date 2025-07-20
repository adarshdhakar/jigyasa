import React, { useState, useEffect } from 'react';
import bgImage from '../images/image2.jpeg';
import { useTranslation } from 'react-i18next';

const VolunteerApplicationForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    qualification: '',
    location: '',
    email: '',
    phone: '',
  });

  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const res = await fetch('http://localhost:5000/applicant/all');
        const data = await res.json();
        setVolunteers(data.volunteers || []);
      } catch (err) {
        console.error('Error fetching volunteers:', err);
      }
    };

    fetchVolunteers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transformedData = {
      ...formData,
      age: parseInt(formData.age),
      qualification: formData.qualification.split(',').map(q => q.trim()),
      gender: formData.gender === 'male' ? 'M' : formData.gender === 'female' ? 'F' : 'O',
    };

    try {
      const res = await fetch('http://localhost:5000/applicant/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transformedData),
      });

      if (res.ok) {
        alert(t('volunteers.success'));
        setFormData({
          name: '', age: '', gender: '', qualification: '',
          location: '', email: '', phone: '',
        });
      } else {
        alert(t('volunteers.failure'));
      }
    } catch (err) {
      console.error('Error submitting application:', err);
      alert(t('volunteers.error'));
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative p-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-md z-0"></div>

      <div className="relative z-10 w-full max-w-lg bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-6 text-center">
          {t('volunteers.title')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: t('volunteers.name'), id: 'name', type: 'text' },
            { label: t('volunteers.age'), id: 'age', type: 'number' },
            { label: t('volunteers.location'), id: 'location', type: 'text' },
            { label: t('volunteers.email'), id: 'email', type: 'email' },
            { label: t('volunteers.phone'), id: 'phone', type: 'tel' }
          ].map(({ label, id, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">
                {label}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-blue-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}

          <div>
            <label htmlFor="gender" className="block text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">
              {t('volunteers.gender')}
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-blue-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">{t('volunteers.select_gender')}</option>
              <option value="male">{t('volunteers.male')}</option>
              <option value="female">{t('volunteers.female')}</option>
              <option value="other">{t('volunteers.other')}</option>
            </select>
          </div>

          <div>
            <label htmlFor="qualification" className="block text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">
              {t('volunteers.qualification')}
            </label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
              placeholder={t('volunteers.qual_placeholder')}
              className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-blue-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {t('volunteers.submit')}
            </button>
          </div>
        </form>
      </div>

      <div className="relative z-10 w-full max-w-lg bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3 text-center">
          {t('volunteers.existing')}
        </h3>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 text-sm space-y-1">
          {volunteers.length === 0 ? (
            <li className="italic text-gray-500 dark:text-gray-400">{t('volunteers.no_volunteers')}</li>
          ) : (
            volunteers.map((v) => (
              <li key={v._id}>{v.name}</li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default VolunteerApplicationForm;
