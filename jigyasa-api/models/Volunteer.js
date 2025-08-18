const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    volunteerID: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    HighestQualification: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    schools: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'school' }],
        default: []
    }
});

const VolunteerApplication = mongoose.model('VolunteerApplication', volunteerSchema);
module.exports = VolunteerApplication;