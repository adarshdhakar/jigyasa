const express = require('express');
const router = express.Router();

const volunteerController = require('../controllers/volunteers.controller');

router.post('/add', volunteerController.createVolunteerApplication);

module.exports = router;