const express = require('express');
const router = express.Router();

const notificationController = require('../controllers/notification.controller');

// Get all notifications
router.get('/', notificationController.getAllNotifications);

// Update notification status
router.put('/:notificationId/update', notificationController.updateNotificationStatus);

module.exports = router;
