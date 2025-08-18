import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function AssignedSchoolsPage() {
  const { t } = useTranslation();
  const [schools, setSchools] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  // Dummy data: government schools in Maharashtra
  useEffect(() => {
    const dummy = [
      { id: '1', name: 'Maharashtra State Board Secondary School', address: 'Shivaji Nagar, Pune, Maharashtra', description: 'Grades 6–10, well-equipped classrooms and library.' },
      { id: '2', name: 'S.V. High School (Zilla Parishad School)', address: 'Kolhapur Road, Sangli, Maharashtra', description: 'Grades 6–8, emphasis on STEM activities and sports.' },
      { id: '3', name: 'Divisional Primary School', address: 'Dongri, Mumbai, Maharashtra', description: 'Grades 1–7, community-driven education programs.' },
      { id: '4', name: 'Zilla Parishad Secondary School', address: 'Jalgaon–Chalisgaon Road, Jalgaon, Maharashtra', description: 'Grades 6–10, includes science and computer labs.' },
      { id: '5', name: 'Government Urdu School', address: 'Camp, Aurangabad, Maharashtra', description: 'Grades 6–8, Urdu-medium instruction with cultural activities.' },
    ];
    setSchools(dummy);
  }, []);

  const openModal = (school) => setSelected(school);
  const closeModal = () => setSelected(null);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <button
        onClick={() => navigate('/volunteer/dashboard')}
        className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-md z-50 transition"
        title="Go to Dashboard"
      >
        <ArrowRightCircle className="w-6 h-6" />
      </button>
      <h2 className="text-2xl font-semibold text-center mb-6 text-amber-700 dark:text-amber-300">
        {t('assigned_schools_heading', 'My Assigned Schools')}
      </h2>
      <div className="grid mx-12 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {schools.map((s) => (
          <div key={s.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">{s.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{s.address}</p>
            <button
              onClick={() => openModal(s)}
              className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition"
            >
              {t('view_details', 'View Details')}
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden max-w-lg w-full"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{selected.name}</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <p className="mb-4 text-gray-700 dark:text-gray-300">{selected.description}</p>
              <div className="aspect-video w-full rounded">
                <iframe
                  title="School Location"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(selected.address)}&output=embed`}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
