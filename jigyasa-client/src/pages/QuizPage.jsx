import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

export default function QuizPage() {
  const navigate = useNavigate();
  const [questions] = useState([
    {
      question: "Which part of the plant conducts photosynthesis?",
      options: ["Roots", "Stem", "Leaves", "Flowers"],
      answer: 2,
    },
    {
      question: "What is the process of water turning into vapor called?",
      options: ["Condensation", "Evaporation", "Freezing", "Melting"],
      answer: 1,
    },
    {
      question: "Which organ helps in breathing?",
      options: ["Heart", "Liver", "Lungs", "Kidneys"],
      answer: 2,
    },
    {
      question: "What kind of energy does the Sun give us?",
      options: ["Wind Energy", "Nuclear Energy", "Solar Energy", "Chemical Energy"],
      answer: 2,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Earth", "Mars", "Jupiter"],
      answer: 2,
    }
  ]);

  const [current, setCurrent] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleSelect = (index) => {
    if (selectedAnswers[current] !== undefined) return;
    setSelectedAnswers(prev => ({ ...prev, [current]: index }));
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const selected = selectedAnswers[current];
  const currentQ = questions[current];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 relative transition-colors duration-300">
      <Spline scene="https://prod.spline.design/xCkP8H1ZltLUMGNW/scene.splinecode" />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl max-w-xl w-full shadow-2xl text-center transition">
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
            6th Grade Science Quiz
          </h2>

          <p className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            {currentQ.question}
          </p>
          <div className="grid gap-3">
            {currentQ.options.map((opt, idx) => {
              let buttonStyle =
                'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600';

              if (selected !== undefined) {
                if (idx === currentQ.answer) {
                  buttonStyle = 'bg-green-200 dark:bg-green-500/50 border-green-500 text-black dark:text-white';
                } else if (idx === selected) {
                  buttonStyle = 'bg-red-200 dark:bg-red-500/50 border-red-500 text-black dark:text-white';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`px-4 py-2 rounded-md text-left transition duration-300 ${buttonStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={current === 0}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            {current < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => navigate("/volunteer/gradechapters")}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
