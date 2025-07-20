import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import bgImage from '../images/image2.jpeg';

const AdminVolunteerList = () => {
  const { t } = useTranslation();

  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch('/');
        const data = await response.json();
        setVolunteers(data);
      } catch (err) {
        console.error(t('volunteer_list.fetch_error'), err);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, [t]);

  const assigned = volunteers.filter(v => v.assignedSchool);
  const unassigned = volunteers.filter(v => !v.assignedSchool);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: 'blur(25px)',
          zIndex: 0,
        }}
      ></div>

      <div className="relative z-10 w-full max-w-5xl p-8 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-80 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-300 mb-8">
          {t('volunteer_list.title')}
        </h1>

        {loading ? (
          <p className="text-center text-blue-600 dark:text-blue-400">
            {t('volunteer_list.loading')}
          </p>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
                {t('volunteer_list.assigned_title')}
              </h2>
              {assigned.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">
                  {t('volunteer_list.no_assigned')}
                </p>
              ) : (
                <ul className="space-y-2">
                  {assigned.map(v => (
                    <li
                      key={v._id}
                      className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg px-4 py-2 text-blue-900 dark:text-blue-200"
                    >
                      <strong>{v.name}</strong> – {v.assignedSchool}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">
                {t('volunteer_list.unassigned_title')}
              </h2>
              {unassigned.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">
                  {t('volunteer_list.no_unassigned')}
                </p>
              ) : (
                <ul className="space-y-2">
                  {unassigned.map(v => (
                    <li
                      key={v._id}
                      className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg px-4 py-2 text-red-800 dark:text-red-300"
                    >
                      <strong>{v.name}</strong> – {t('volunteer_list.not_assigned')}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminVolunteerList;
