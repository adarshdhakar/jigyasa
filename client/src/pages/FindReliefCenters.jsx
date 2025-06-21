import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';

const reliefCentersMock = [
  { id: 1, name: 'D.G. Ruparel College', location: 'Matunga, Mumbai', capacity: 120, status: 'active' },
  { id: 2, name: 'Balmohan Vidyamandir', location: 'Dadar, Mumbai', capacity: 0, status: 'full' },
  { id: 3, name: 'IES Modern English School', location: 'Dadar East, Mumbai', capacity: 45, status: 'active' },
  { id: 4, name: 'R.A. Podar College of Commerce & Economics', location: 'Matunga, Mumbai', capacity: 20, status: 'active' },
  { id: 5, name: 'Smt. Sulochanadevi Singhania School', location: 'Thane', capacity: 0, status: 'full' },
  { id: 6, name: 'Dr. Antonio Da Silva High School', location: 'Dadar West, Mumbai', capacity: 10, status: 'inactive' },
  { id: 7, name: 'K.E.S. Shroff College', location: 'Kandivali (West), Mumbai', capacity: 30, status: 'active' },
  { id: 8, name: 'Fergusson College', location: 'Pune', capacity: 0, status: 'full' },
  { id: 9, name: 'Abhinav Vidyalay & Junior College', location: 'Dombivli, Thane District', capacity: 5, status: 'inactive' },
  { id: 10, name: 'Vidya Prasarak Mandal (VPM) School', location: 'Thane', capacity: 50, status: 'active' },
  { id: 11, name: 'Saraswati Vidyalaya', location: 'Nagpur', capacity: 0, status: 'full' },
  { id: 12, name: 'Bhavan\'s B.P. Vidya Mandir', location: 'Nagpur', capacity: 8, status: 'inactive' },
  { id: 13, name: 'Huzurpaga Girls’ High School', location: 'Pune', capacity: 35, status: 'active' },
  { id: 14, name: 'Jankidevi Bajaj High School', location: 'Wardha', capacity: 0, status: 'full' },
  { id: 15, name: 'Nashik Cambridge School', location: 'Nashik', capacity: 25, status: 'active' },
  { id: 16, name: 'Dnyan Ganga Education Trust School', location: 'Ghodbunder Road, Thane', capacity: 0, status: 'full' },
];


export default function FindReliefCenters() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selectedCenter, setSelectedCenter] = useState(null);

  const filteredCenters = reliefCentersMock.filter((center) =>
    center.name.toLowerCase().includes(search.toLowerCase()) ||
    center.location.toLowerCase().includes(search.toLowerCase())
  );

  const getCardColors = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 dark:bg-gray-800 border-green-200 dark:border-green-700';
      case 'full':
        return 'bg-red-100 dark:bg-yellow-900 border-red-200 dark:border-red-600';
      case 'inactive':
        return 'bg-yellow-100 dark:bg-purple-950 border-yellow-200 dark:border-yellow-700';
      default:
        return 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-600';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-green-700 dark:text-green-400';
      case 'full':
        return 'text-red-700 dark:text-red-400';
      case 'inactive':
        return 'text-yellow-700 dark:text-yellow-300';
      default:
        return 'text-gray-600 dark:text-gray-300';
    }
  };

  const getGoogleMapsUrl = (location) => {
    // Use the free maps search URL format, URL encoded
    return `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-indigo-100 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-white transition-colors">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-3xl md:text-5xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t('relief_centers_heading')}
        </motion.h1>

        <div className="mb-8 text-center">
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-2/3 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCenters.length === 0 ? (
            <p className="col-span-full text-center text-gray-600 dark:text-gray-400">
              {t('no_centers_found')}
            </p>
          ) : (
            filteredCenters.map((center) => (
              <motion.div
                key={center.id}
                className={`p-6 rounded-2xl shadow-md border transition-all duration-200 ${getCardColors(center.status)}`}
                whileHover={{ scale: 1.02 }}
              >
                <h2 className="text-xl font-semibold mb-2">{center.name}</h2>
                <p className="text-sm mb-1">{t('location')}: {center.location}</p>
                <p className="text-sm mb-1">{t('capacity')}: {center.capacity}</p>
                <p className={`text-sm font-medium ${getStatusTextColor(center.status)}`}>
                  {t('status')}: {t(center.status.toLowerCase())}
                </p>
                <Button
                  className="mt-4 w-full"
                  onClick={() => setSelectedCenter(center)}
                >
                  {t('view_details')}
                </Button>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCenter && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCenter(null)}
            />

            <motion.div
              className="fixed top-[12%] left-[25%] max-w-3xl w-full max-h-[80vh] overflow-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl z-50 p-6 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-4">{selectedCenter.name}</h2>
              <p className="mb-2"><strong>{t('location')}:</strong> {selectedCenter.location}</p>
              <p className="mb-2"><strong>{t('capacity')}:</strong> {selectedCenter.capacity}</p>
              <p className="mb-2">
                <strong>{t('status')}:</strong> <span className={getStatusTextColor(selectedCenter.status)}>{t(selectedCenter.status.toLowerCase())}</span>
              </p>

              <div className="mt-6 h-[290px] w-[700px] aspect-video rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 shadow-md">
                <iframe
                  title={`map-${selectedCenter.id}`}
                  src={getGoogleMapsUrl(selectedCenter.location)}
                  width="100%"
                  height="300"
                  loading="lazy"
                  className="rounded-lg"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="mt-6 text-right">
                <Button onClick={() => setSelectedCenter(null)}>{t('close')}</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
