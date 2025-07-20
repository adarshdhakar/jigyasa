import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AdminSchoolList = () => {
  const { t } = useTranslation();

  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch('http://localhost:5000/school/all');
        if (!res.ok) throw new Error(t('school_list.fetch_error'));

        const data = await res.json();
        console.log('API response:', data);

        if (!data || !Array.isArray(data.schools)) {
          throw new Error(t('school_list.invalid_data'));
        }

        setSchools(data.schools);
      } catch (err) {
        setError(err.message || t('school_list.general_error'));
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, [t]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-blue-600 dark:text-blue-400">
        {t('school_list.loading')}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-400 mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
        {t('school_list.title')}
      </h1>

      {!Array.isArray(schools) || schools.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          {t('school_list.no_schools')}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schools.map((school) => {
            let createdDate = 'N/A';
            let updatedDate = 'N/A';
            try {
              createdDate = school.createdAt ? new Date(school.createdAt).toLocaleDateString() : 'N/A';
              updatedDate = school.updatedAt ? new Date(school.updatedAt).toLocaleDateString() : 'N/A';
            } catch {}

            return (
              <div
                key={school._id || Math.random()}
                className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-2xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-xl transition-all"
              >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  {school.name || t('school_list.unnamed')}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <strong>{t('school_list.address')}:</strong> {school.address || t('school_list.not_provided')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <strong>{t('school_list.email')}:</strong> {school.email || t('school_list.not_provided')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <strong>{t('school_list.phone')}:</strong> {school.phone || t('school_list.not_provided')}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <strong>{t('school_list.status')}:</strong> {school.status || t('school_list.active')}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {t('school_list.created')}: {createdDate} | {t('school_list.updated')}: {updatedDate}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminSchoolList;
