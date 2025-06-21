const Quiz = require('../models/Quiz');

const getQuizById = async (req, res) => {
    try {
        const { quizId } = req.params;
        const quiz = await Quiz.findOne({ quizId: Number(quizId) });

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quiz', error: error.message });
    }
}

const getQuizzesByChapterId = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const quizzes = await Quiz.find({ chapterId: Number(chapterId) });

    if (!quizzes.length) {
      return res.status(404).json({ message: 'No quizzes found for this chapter' });
    }

    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes', error: error.message });
  }
};

const createQuiz = async (req, res) => {
    try {
        const lastQuiz = await Quiz.findOne().sort({ quizId: -1 });
        const quizId = lastQuiz ? lastQuiz.quizId + 1 : 1;
        const { class: quizClass, questions } = req.body;

        // Validate input
        if (!quizId || !quizClass || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const newQuiz = new Quiz({
            quizId,
            class: quizClass,
            questions
        });

        await newQuiz.save();
        res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
    } catch (error) {
        res.status(500).json({ message: 'Error creating quiz', error: error.message });
    }
}

module.exports = { getQuizById, createQuiz, getQuizzesByChapterId };