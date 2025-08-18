const Syllabus = require('../models/syllabus');

// Create syllabus function
const createSyllabus = async (syllabusData) => {
    try {
        const syllabus = new Syllabus(syllabusData);
        const savedSyllabus = await syllabus.save();
        return savedSyllabus;
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('A syllabus for this class and subject combination already exists');
        }
        if (error.name === 'ValidationError') {
            throw new Error(`Validation Error: ${error.message}`);
        }
        throw new Error(`Error creating syllabus: ${error.message}`);
    }
};

// Get all syllabi function
const getAllSyllabi = async (filters = {}) => {
    try {
        const syllabi = await Syllabus.find(filters).populate('items');
        return syllabi;
    } catch (error) {
        throw new Error(`Error fetching syllabi: ${error.message}`);
    }
};

// Get syllabus by class and subject function
const getSyllabusByClassAndSubject = async (classNum, subject) => {
    try {
        const syllabus = await Syllabus.findOne({ class: classNum, subject }).populate('items');
        if (!syllabus) {
            throw new Error('Syllabus not found');
        }
        return syllabus;
    } catch (error) {
        throw new Error(`Error fetching syllabus: ${error.message}`);
    }
};

// Update syllabus function
const updateSyllabus = async (classNum, subject, updateData) => {
    try {
        // Prevent updating class or subject if they're being changed
        if (updateData.class && updateData.class !== classNum) {
            throw new Error('Cannot change class of an existing syllabus');
        }
        if (updateData.subject && updateData.subject !== subject) {
            throw new Error('Cannot change subject of an existing syllabus');
        }

        const syllabus = await Syllabus.findOneAndUpdate(
            { class: classNum, subject },
            updateData,
            { 
                new: true,
                runValidators: true
            }
        ).populate('items');
        
        if (!syllabus) {
            throw new Error('Syllabus not found');
        }
        
        return syllabus;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new Error(`Validation Error: ${error.message}`);
        }
        throw new Error(`Error updating syllabus: ${error.message}`);
    }
};

// Delete syllabus function
const deleteSyllabus = async (classNum, subject) => {
    try {
        const syllabus = await Syllabus.findOneAndDelete({ class: classNum, subject });
        if (!syllabus) {
            throw new Error('Syllabus not found');
        }
        return syllabus;
    } catch (error) {
        throw new Error(`Error deleting syllabus: ${error.message}`);
    }
};

// Add item to syllabus function
const addItemsToSyllabus = async (classNum, subject, itemId) => {
    try {
        const syllabus = await Syllabus.findOneAndUpdate(
            { class: classNum, subject },
            { $addToSet: { items: itemId } },
            { 
                new: true,
                runValidators: true
            }
        ).populate('items');
        
        if (!syllabus) {
            throw new Error('Syllabus not found');
        }
        
        return syllabus;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new Error(`Validation Error: ${error.message}`);
        }
        throw new Error(`Error adding item to syllabus: ${error.message}`);
    }
};

// Remove items from syllabus function
const removeItemsFromSyllabus = async (classNum, subject, itemIds) => {
    try {
        const syllabus = await Syllabus.findOneAndUpdate(
            { class: classNum, subject },
            { $pullAll: { items: itemIds } },
            { 
                new: true,
                runValidators: true
            }
        ).populate('items');
        
        if (!syllabus) {
            throw new Error('Syllabus not found');
        }
        
        return syllabus;
    } catch (error) {
        throw new Error(`Error removing items from syllabus: ${error.message}`);
    }
};

// Get syllabi by class function
const getSyllabiByClass = async (classNum) => {
    try {
        const syllabi = await Syllabus.find({ class: classNum }).populate('items');
        return syllabi;
    } catch (error) {
        throw new Error(`Error fetching syllabi by class: ${error.message}`);
    }
};

// Get syllabi by subject function
const getSyllabiBySubject = async (subject) => {
    try {
        const syllabi = await Syllabus.find({ subject }).populate('items');
        return syllabi;
    } catch (error) {
        throw new Error(`Error fetching syllabi by subject: ${error.message}`);
    }
};

// Validate syllabus data function
const validateSyllabusData = (syllabusData) => {
    const errors = {};

    if (!syllabusData.class) {
        errors.class = 'Class is required';
    } else if (![6, 7, 8].includes(syllabusData.class)) {
        errors.class = 'Class must be either 6, 7, or 8';
    }

    if (!syllabusData.subject || syllabusData.subject.trim().length === 0) {
        errors.subject = 'Subject is required';
    }

    if (syllabusData.items) {
        if (!Array.isArray(syllabusData.items)) {
            errors.items = 'Items must be an array';
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Export all functions as SyllabusService object
const SyllabusService = {
    createSyllabus,
    getAllSyllabi,
    getSyllabusByClassAndSubject,
    updateSyllabus,
    deleteSyllabus,
    addItemsToSyllabus,
    removeItemsFromSyllabus,
    getSyllabiByClass,
    getSyllabiBySubject,
    validateSyllabusData
};

module.exports = SyllabusService;
