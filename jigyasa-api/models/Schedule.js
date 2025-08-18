const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    scheduleId: {
        type: Number,
        required: true,
        unique: true
    },
    volunteerId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    // startTime: {
    //     type: String,
    //     required: true
    // },
    // endTime: {
    //     type: String,
    //     required: true
    // },
    // courseId: {
    //     type: Number,
    //     required: true
    // },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;