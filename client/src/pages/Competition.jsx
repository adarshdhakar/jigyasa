import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftCircle } from 'lucide-react';

const scienceCompetitions = [
  {
    id: 1,
    title: 'Science Sprint (Std 6)',
    description: 'Watch videos and solve chapter-wise quizzes!',
    status: 'Open',
    grade: '6',
  },
  {
    id: 2,
    title: 'Science Sprint (Std 7)',
    description: 'Master Std 7 science with interactive chapter quizzes.',
    status: 'Open',
    grade: '7',
  },
  {
    id: 3,
    title: 'Science Sprint (Std 8)',
    description: 'Complete Std 8 science chapters and challenge your knowledge!',
    status: 'Open',
    grade: '8',
  },
];

export default function Grade() {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {!loaded ? (
        <div className="h-screen relative">
          <Spline scene="https://prod.spline.design/xCkP8H1ZltLUMGNW/scene.splinecode" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-white text-4xl font-bold animate-pulse">
              Loading Science Grades...
            </h1>
          </div>
        </div>
      ) : (
        <div className="py-12 px-6 max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/volunteer/dashboard')}
            className="fixed top-1/2 left-4 transform -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-md z-50 transition"
            title="Go to Schools"
          >
            <ArrowLeftCircle className="w-6 h-6" />
          </button>

          <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700 dark:text-indigo-300">
            🔬 Science Grades (6th to 8th)
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scienceCompetitions.map((comp) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: comp.id * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300 mb-2">
                  {comp.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{comp.description}</p>
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-200">
                  {comp.status}
                </span>
                <div className="mt-4">
                  <button
                    onClick={() =>
                      navigate('/volunteer/gradechapters', {
                        state: { grade: comp.grade },
                      })
                    }
                    className="w-full py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-300"
                  >
                    Explore Grade {comp.grade}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
