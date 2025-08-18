import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, Calendar, MapPin, GraduationCap, Hash } from 'lucide-react';
import bgImage from '../images/image2.jpeg';
import BASE_URL from '../config';

const AdminVolunteerList = () => {
  const { t } = useTranslation();
  const [volunteers, setVolunteers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/volunteers/all`);
        const data = await res.json();
        setVolunteers(data.volunteers);
        setFiltered(data.volunteers);
      } catch (err) {
        console.error(t('volunteer_list.fetch_error'), err);
      } finally {
        setLoading(false);
      }
    };
    fetchVolunteers();
  }, [t]);

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setSearchQuery(q);
    setFiltered(
      volunteers.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.email.toLowerCase().includes(q) ||
          v.Location.toLowerCase().includes(q)
      )
    );
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: 'blur(30px) brightness(0.6)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 w-full max-w-6xl p-8 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-80 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-md">
        <h1 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-300 dark:to-indigo-400 mb-8">
          {t('volunteer_list.title')}
        </h1>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder={t('volunteer_list.search_placeholder') || 'Search by name, email or location'}
            className="w-full max-w-md px-5 py-3 text-base text-black rounded-full border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 transition"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {loading ? (
          <p className="text-center text-xl text-indigo-600 dark:text-indigo-300">{t('volunteer_list.loading')}</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-lg text-gray-600 dark:text-gray-400">{t('volunteer_list.no_results')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((v) => (
              <div
                key={v._id}
                className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-1"
              >
                {/* Badge */}
                <div className="absolute top-4 right-4 flex items-center space-x-1">
                  <Hash className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">
                    #{v.volunteerID}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  {v.name}
                </h2>

                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-blue-500" />
                    <span>{v.email}</span>
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-green-500" />
                    <span>{v.PhoneNumber}</span>
                  </p>
                  <p className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                    <span>{v.age} yrs</span>
                  </p>
                  <p className="flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-yellow-500" />
                    <span className="capitalize">{v.HighestQualification}</span>
                  </p>
                  <p className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-red-500" />
                    <span>{v.Location}</span>
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {v.schools.length === 0 ? (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300">
                      No Schools
                    </span>
                  ) : (
                    v.schools.map((s) => (
                      <span
                        key={s._id}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                      >
                        {s.name || s._id}
                      </span>
                    ))
                  )}
                </div>

                <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-right">
                  Created: {new Date(v.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVolunteerList;
