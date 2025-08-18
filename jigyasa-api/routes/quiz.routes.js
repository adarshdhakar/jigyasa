const express = require('express');
const router = express.Router();

const quizController = require('../controllers/quiz.controller');

router.get('/chapter/:chapterId', quizController.getQuizzesByChapterId);

router.post('/add', quizController.createQuiz);

module.exports = router;