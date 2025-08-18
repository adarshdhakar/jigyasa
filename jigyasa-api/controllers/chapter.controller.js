const Chapter = require('../models/Chapters');

const getChapterById = async (req, res) => {
    try {
        const { chapterId } = req.params;
        const chapter = await Chapter.findOne({ chapterId: Number(chapterId) });

        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }

        res.status(200).json(chapter);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching chapter', error: error.message });
    }
};

const createChapter = async (req, res) => {
    try {
        const lastChapter = await Chapter.findOne().sort({ chapterId: -1 });
        const chapterId = lastChapter ? lastChapter.chapterId + 1 : 1;
        const { name, youtubeLinks, quizzes } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Chapter name is required' });
        }

        const newChapter = new Chapter({
            chapterId,
            name,
            resources: {
                youtubeLinks: youtubeLinks || [],
                quizzes: quizzes || []
            }
        });

        await newChapter.save();

        res.status(201).json({ message: 'Chapter created successfully', chapter: newChapter });
    } catch (error) {
        res.status(500).json({ message: 'Error creating chapter', error: error.message });
    }
};

module.exports = { getChapterById, createChapter };