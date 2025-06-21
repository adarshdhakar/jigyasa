const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    quizId: {
        type: Number,
        required: true,
        unique: true
    },
    class: {
        type: Number,
        required: true,
        enum: [6, 7, 8]
    },
    questions: [{
        questionText: {
            type: String,
            required: true
        },
        options: [{
            optionText: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                default: false
            }
        }],
        correctAnswerIndex: {
            type: Number,
            required: true
        }
    }],
    score: {
        type: Number,
        default: 0
    },
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;