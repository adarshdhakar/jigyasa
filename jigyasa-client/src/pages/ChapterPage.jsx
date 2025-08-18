import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BASE_URL from '../config';

export default function ChapterPage() {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  const randomVideos = [
    'https://youtu.be/y3nRoZeslXQ?si=BXZ05hd0zm_IZvws',
    'https://youtu.be/Dx3RpXdJw2k?si=ro7hZ8ze-QusyDqQ',
  ];

  useEffect(() => {
    fetch(`${BASE_URL}/api/chapters/${chapterId}`)
      .then((res) => res.json())
      .then((data) => {
        const updatedData = {
          ...data,
          resources: {
            ...data.resources,
            youtubeLinks: randomVideos,
          }
        };
        setChapter(updatedData);
      })
      .catch((err) => {
        console.error('Error fetching chapter data:', err);
        setChapter({
          name: `Chapter ${chapterId}`,
          resources: {
            youtubeLinks: randomVideos,
            quizzes: [1]
          }
        });
      });
  }, [chapterId]);

  if (!chapter) return (
    <div className="text-center mt-20 text-gray-700 dark:text-gray-300">
      Loading...
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700 dark:text-indigo-300">
        {chapter.name || 'Chapter'}
      </h2>

      <div className="max-w-4xl mx-auto space-y-8">
        {chapter.resources?.quizzes?.length > 0 ? (
          <>
            {/* <button
              onClick={() => setShowModal(true)}
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition"
            >
              Take Quiz
            </button> */}

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowModal(false)}></div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 z-10 max-w-sm w-full transition">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Start Quiz?</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Are you sure you want to begin the quiz for <span className="font-medium">{chapter.name}</span>?
                  </p>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => navigate("/volunteer/gradechapters")}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => navigate(`/volunteer/quizpage/${chapterId}`)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold"
                    >
                      Start Quiz
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">No quiz available for this chapter.</p>
        )}
      </div>
    </div>
  );
}
