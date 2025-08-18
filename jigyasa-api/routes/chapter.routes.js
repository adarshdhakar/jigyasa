const express = require('express');
const router = express.Router();

const chapterController = require('../controllers/chapter.controller');

router.get('/:chapterId', chapterController.getChapterById);
router.post('/add', chapterController.createChapter);

module.exports = router;