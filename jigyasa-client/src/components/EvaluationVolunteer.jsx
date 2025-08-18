import React from "react";
import { Star, CalendarDays, User, School } from "lucide-react";

const feedbacks = [
  {
    id: 1,
    evaluator: "Priya Sharma",
    school: "Sunrise Public School",
    rating: 4,
    date: "2025-07-20",
    comments: "Students are engaged and teachers are attentive. Could use more digital resources."
  },
  {
    id: 2,
    evaluator: "Amit Verma",
    school: "Green Valley Academy",
    rating: 5,
    date: "2025-07-18",
    comments: "Excellent learning environment and well-maintained infrastructure."
  },
  {
    id: 3,
    evaluator: "Neha Yadav",
    school: "Hope Foundation School",
    rating: 3,
    date: "2025-07-15",
    comments: "Some classrooms were overcrowded. Teachers were motivated but lacked training."
  }
];

const RatingStars = ({ rating }) => (
  <div className="flex items-center space-x-1 text-yellow-500">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-500" : "fill-gray-300"}`} />
    ))}
  </div>
);

const EvaluationFeedbacks = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Evaluation Volunteer Feedbacks</h2>
      <div className="grid gap-4">
        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="border rounded-2xl p-4 shadow-sm bg-white dark:bg-gray-800 dark:text-white"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
              <div className="flex items-center space-x-4">
                <User className="w-5 h-5 text-gray-500" />
                <span className="font-medium">{fb.evaluator}</span>
              </div>
              <div className="flex items-center space-x-4">
                <School className="w-5 h-5 text-gray-500" />
                <span className="font-medium">{fb.school}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <RatingStars rating={fb.rating} />
              <div className="flex items-center text-gray-500 text-sm">
                <CalendarDays className="w-4 h-4 mr-1" />
                {new Date(fb.date).toLocaleDateString()}
              </div>
            </div>

            <div className="text-sm text-gray-700 dark:text-gray-300 italic">
              “{fb.comments}”
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvaluationFeedbacks;
