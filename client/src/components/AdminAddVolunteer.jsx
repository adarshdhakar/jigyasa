import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BASE_URL from '../config';

const AdminAddApplicant = () => {
  const { t } = useTranslation();

  const [applicants, setApplicants] = useState([]);
  const [selectedApplicantId, setSelectedApplicantId] = useState('');

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch(`${BASE_URL}/applicant/all`);
        const data = await response.json();
        setApplicants(data.applicants || []);
      } catch (error) {
        console.error(t('add_applicant.fetch_error'), error);
      }
    };

    fetchApplicants();
  }, [t]);

  const handleChange = (e) => {
    setSelectedApplicantId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedApplicantId) {
      alert(t('add_applicant.select_warning'));
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/applicant/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicantId: selectedApplicantId }),
      });

      if (response.ok) {
        alert(t('add_applicant.success'));
        setSelectedApplicantId('');
      } else {
        alert(t('add_applicant.failure'));
      }
    } catch (error) {
      console.error(t('add_applicant.submit_error'), error);
      alert(t('add_applicant.submit_error_alert'));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
        {t('add_applicant.title')}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <select
          value={selectedApplicantId}
          onChange={handleChange}
          required
          className="px-4 py-3 text-base rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        >
          <option value="">{t('add_applicant.select_placeholder')}</option>
          {applicants.map((applicant) => (
            <option key={applicant._id} value={applicant._id}>
              {applicant.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {t('add_applicant.submit_button')}
        </button>
      </form>
    </div>
  );
};

export default AdminAddApplicant;
