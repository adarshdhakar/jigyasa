const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    chapterId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    resources: {
        youtubeLinks: [{
            type: String,
            validate: {
                validator: function(v) {
                    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(v);
                },
                message: 'Please enter a valid YouTube link'
            }
        }],
        quizzes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz'
        }]
    }
});

const Chapter = mongoose.model('Chapter', chapterSchema);
module.exports = Chapter;