import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../config';

export default function Grade6Chapters() {
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/api/chapters/1`)
      .then((res) => res.json())
      .then((data) => {
        // Ensure data is an array
        if (Array.isArray(data)) {
          setChapters(data);
        } else {
          setChapters([data]); // If only one object is returned
        }
      })
      .catch((err) => console.error('Error fetching chapters:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700 dark:text-indigo-300">
        📚 6th Grade Science Chapters
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.length > 0 ? (
          chapters.map((chapter, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
                {chapter.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Chapter ID: {chapter.chapterId}
              </p>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Available Resources:
                </h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  <li>{chapter.resources.youtubeLinks.length} Video Lessons</li>
                  <li>{chapter.resources.quizzes.length} Quizzes</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  onClick={() => navigate(`/volunteer/gradechapters/videos`, { state: { chapterId: chapter.chapterId } })}
                >
                  Watch Video
                </button>
                <button
                  className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  onClick={() => navigate(`/volunteer/chapterpage/${chapter.chapterId}`)}
                >
                  Take Quiz
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300 col-span-full">
            Loading chapters...
          </p>
        )}
      </div>
    </div>
  );
}
