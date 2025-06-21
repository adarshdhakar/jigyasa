const Notification = require('../models/Notifications');
const Schedule = require('../models/Schedule');

const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ date: -1 }); // Sort by newest first
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch notifications', error: error.message });
    }
};

const updateNotificationStatus = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const { status, volunteerId } = req.body;

        // Find the notification by ID
        const notification = await Notification.findOne({ notificationId: Number(notificationId) });
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        // Check if the status is being changed to 'accepted'
        if (status === 'accepted') {
            // Auto-generate a scheduleId (e.g., based on timestamp or count)
            const latest = await Schedule.findOne().sort({ scheduleId: -1 });
            const newScheduleId = latest ? latest.scheduleId + 1 : 1;

            const schedule = new Schedule({
                scheduleId: newScheduleId,
                volunteerId,
                date: notification.date,
                // startTime,
                // endTime,
                // courseId,
            });

            await schedule.save();
            await Notification.deleteOne({ notificationId: Number(notificationId) });
        } else if (status === 'rejected') {
            // If the status is 'rejected', simply delete the notification
            await Notification.deleteOne({ notificationId: Number(notificationId) });
        }
        res.status(200).json({ message: 'Notification status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

module.exports = { updateNotificationStatus, getAllNotifications };