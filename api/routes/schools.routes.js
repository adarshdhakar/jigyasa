const express = require('express');
const router = express.Router();

const schoolController = require('../controllers/school.controller');

// update notification status
router.get('/all', schoolController.getAllSchools);
router.get('/:schoolId', schoolController.getSchoolById);

module.exports = router;