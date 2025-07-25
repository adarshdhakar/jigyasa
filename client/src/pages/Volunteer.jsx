import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import bgImage from '../images/image2.jpeg';

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

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

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
      qualification: formData.qualification.split(',').map((q) => q.trim()),
      gender: formData.gender === 'male' ? 'M' : formData.gender === 'female' ? 'F' : 'O',
    };

    try {
      const res = await fetch('http://localhost:5000/applicant/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transformedData),
      });

      if (res.ok) {
        showToast(t('volunteers.success'), 'success');
        setFormData({
          name: '', age: '', gender: '', qualification: '',
          location: '', email: '', phone: '',
        });
      } else {
        showToast(t('volunteers.failure'), 'error');
      }
    } catch (err) {
      console.error('Error submitting application:', err);
      showToast(t('volunteers.error'), 'error');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-6">
      {/* Background Image */}
      <img
        src={bgImage}
        alt="Volunteer"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        style={{ filter: 'brightness(0.6) blur(1px)' }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-70 z-10" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-3xl mx-auto py-10 px-4">
        <h2 className="text-4xl font-extrabold text-white text-center mb-10 drop-shadow-lg">
          {t('volunteers.title')}
        </h2>

        <div className="bg-white/10 dark:bg-gray-800/40 backdrop-blur-md rounded-3xl shadow-2xl px-8 py-10 md:p-12 text-gray-800 dark:text-white space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[{ id: 'name' }, { id: 'age' }, { id: 'location' }, { id: 'email' }, { id: 'phone' }].map(({ id }) => (
                <div key={id}>
                  <label className="block mb-1 font-medium text-gray-300">{t(`volunteers.${id}`)}</label>
                  <input
                    type={id === 'age' ? 'number' : id === 'email' ? 'email' : id === 'phone' ? 'tel' : 'text'}
                    name={id}
                    value={formData[id]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-xl bg-gray-100/20 dark:bg-gray-700/20 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600"
                  />
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-300">{t('volunteers.gender')}</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-xl bg-gray-100/20 dark:bg-gray-700/20 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600"
                >
                  <option value="">{t('volunteers.select_gender')}</option>
                  <option value="male">{t('volunteers.male')}</option>
                  <option value="female">{t('volunteers.female')}</option>
                  <option value="other">{t('volunteers.other')}</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-300">{t('volunteers.qualification')}</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  required
                  placeholder={t('volunteers.qual_placeholder')}
                  className="w-full px-4 py-2 rounded-xl bg-gray-100/20 dark:bg-gray-700/20 border border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-white bg-blue-500 shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition dark:from-indigo-600 dark:to-blue-700 dark:hover:from-indigo-700 dark:hover:to-blue-800"
              >
                {t('volunteers.submit')}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-10 bg-white/10 dark:bg-gray-800/40 backdrop-blur-md rounded-3xl shadow-lg px-6 py-6 text-gray-100">
          <h3 className="text-lg font-semibold text-center mb-4">{t('volunteers.existing')}</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {volunteers.length === 0 ? (
              <li className="italic text-gray-400">{t('volunteers.no_volunteers')}</li>
            ) : (
              volunteers.map((v) => (
                <li key={v._id}>{v.name}</li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-xl shadow-lg text-white transition-opacity duration-300 ${
            toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default VolunteerApplicationForm;
