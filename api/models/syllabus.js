const mongoose = require('mongoose');

const syllabusSchema = new mongoose.Schema({
    class: {
        type: Number,
        required: [true, "Class is required"],
        enum: {
            values: [6, 7, 8],
            message: "Class must be either 6, 7, or 8"
        }
    },
    subject: {
        type: String,
        required: [true, "Subject is required"],
        trim: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item'
    }]
}, {
    timestamps: true
});

// Create compound index for class and subject to ensure uniqueness
syllabusSchema.index({ class: 1, subject: 1 }, { unique: true });

const Syllabus = mongoose.model('syllabus', syllabusSchema);

module.exports = Syllabus;
