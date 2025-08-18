import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BASE_URL from '../config';

export default function ChapterPage() {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const navigate = useNavigate();

  const randomVideos = [
    'https://youtu.be/y3nRoZeslXQ?si=BXZ05hd0zm_IZvws', // Light and Shadows
    'https://youtu.be/Dx3RpXdJw2k?si=ro7hZ8ze-QusyDqQ', // Water
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

  const videoLinks = chapter.resources?.youtubeLinks || [];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700 dark:text-indigo-300">
        {chapter.name || 'Chapter'}
      </h2>

      <div className="max-w-4xl mx-auto space-y-8">
        {videoLinks.length > 0 ? (
          videoLinks.map((link, idx) => {
            const embedUrl = link.includes('watch?v=')
              ? link.replace('watch?v=', 'embed/')
              : link.replace('youtu.be/', 'www.youtube.com/embed/');
            return (
              <div key={idx} className="aspect-video rounded-lg overflow-hidden shadow-md">
                <iframe
                  className="w-full h-full"
                  src={embedUrl}
                  title={`Chapter Video ${idx + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No videos available for this chapter.
          </p>
        )}
      </div>
    </div>
  );
}
