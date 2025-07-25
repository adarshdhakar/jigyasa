const School = require('../models/school');
const Syllabus = require('../models/syllabus');

// Get school by email function
const getSchoolByEmail = async (email) => {
    try {
        const school = await School.findOne({ email });
        if (!school) {
            throw new Error('School not found');
        }
        return school;
    } catch (error) {
        throw new Error(`Error fetching school: ${error.message}`);
    }
};

// services/school.js
const createSchool = async (schoolData) => {
    try {
        const { email, phone } = schoolData.contact || {};

        // Validate email format
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email || !emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }

        // Validate phone number
        if (!phone || !/^\d{10}$/.test(phone)) {
            throw new Error('Phone number must be 10 digits');
        }

        const school = new School(schoolData);
        const savedSchool = await school.save();
        return savedSchool;
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('A school with this email already exists');
        }
        if (error.name === 'ValidationError') {
            throw new Error(`Validation Error: ${error.message}`);
        }
        throw new Error(`Error creating school: ${error.message}`);
    }
};

// Get all schools function
const getAllSchools = async (filters = {}) => {
    try {
        const schools = await School.find(filters)
            .populate('completedItems.items')
            .sort({ createdAt: -1 });
        return schools;
    } catch (error) {
        throw new Error(`Error fetching schools: ${error.message}`);
    }
};

// Update school function
const updateSchool = async (email, updateData) => {
    try {
        // Prevent updating email if it's being changed
        if (updateData.email && updateData.email !== email) {
            throw new Error('Cannot change school email');
        }

        // Validate phone number if it's being updated
        if (updateData.phone && !/^\d{10}$/.test(updateData.phone)) {
            throw new Error('Phone number must be 10 digits');
        }

        const school = await School.findOneAndUpdate(
            { email },
            updateData,
            { 
                new: true,
                runValidators: true
            }
        ).populate('completedItems.items');
        
        if (!school) {
            throw new Error('School not found');
        }
        
        return school;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new Error(`Validation Error: ${error.message}`);
        }
        throw new Error(`Error updating school: ${error.message}`);
    }
};

// Delete school function
const deleteSchool = async (email) => {
    try {
        const school = await School.findOneAndDelete({ email });
        if (!school) {
            throw new Error('School not found');
        }
        return school;
    } catch (error) {
        throw new Error(`Error deleting school: ${error.message}`);
    }
};

// Add completed item function
const addCompletedItem = async (email, completedItemData) => {
    try {
        // Validate class and subject
        if (![6, 7, 8].includes(completedItemData.class)) {
            throw new Error('Class must be either 6, 7, or 8');
        }
        if (!['physics', 'chemistry', 'biology'].includes(completedItemData.subject)) {
            throw new Error('Subject must be physics, chemistry, or biology');
        }

        const school = await School.findOneAndUpdate(
            { email: email },
            { 
                $push: { 
                    completedItems: {
                        ...completedItemData,
                        completedAt: new Date()
                    }
                }
            },
            { 
                new: true,
                runValidators: true
            }
        ).populate('completedItems.items');
        
        if (!school) {
            throw new Error('School not found');
        }
        
        return school;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new Error(`Validation Error: ${error.message}`);
        }
        throw new Error(`Error adding completed item: ${error.message}`);
    }
};

// Remove completed item function
const removeCompletedItem = async (email, completedItemId) => {
    try {
        const school = await School.findOneAndUpdate(
            { email },
            { $pull: { completedItems: { _id: completedItemId } } },
            { 
                new: true,
                runValidators: true
            }
        ).populate('completedItems.items');
        
        if (!school) {
            throw new Error('School not found');
        }
        
        return school;
    } catch (error) {
        throw new Error(`Error removing completed item: ${error.message}`);
    }
};

// Get schools by status function
const getSchoolsByStatus = async (status) => {
    try {
        const schools = await School.find({ status })
            .populate('completedItems.items')
            .sort({ createdAt: -1 });
        return schools;
    } catch (error) {
        throw new Error(`Error fetching schools by status: ${error.message}`);
    }
};

// Get schools by class and subject function
const getSchoolsByClassAndSubject = async (classNum, subject) => {
    try {
        // Validate class and subject
        if (![6, 7, 8].includes(classNum)) {
            throw new Error('Class must be either 6, 7, or 8');
        }
        if (!['physics', 'chemistry', 'biology'].includes(subject)) {
            throw new Error('Subject must be physics, chemistry, or biology');
        }

        const schools = await School.find({
            'completedItems': {
                $elemMatch: {
                    class: classNum,
                    subject: subject
                }
            }
        }).populate('completedItems.items');
        
        return schools;
    } catch (error) {
        throw new Error(`Error fetching schools by class and subject: ${error.message}`);
    }
};

// Get complete items (syllabus + completed) for a school, class and subject
const getCompleteItemsForSchool = async (email, classNum, subject) => {
    try {
        // Validate class and subject
        if (![6, 7, 8].includes(classNum)) {
            throw new Error('Class must be either 6, 7, or 8');
        }
        if (!['physics', 'chemistry', 'biology'].includes(subject)) {
            throw new Error('Subject must be physics, chemistry, or biology');
        }

        // Get school with completed items
        const school = await School.findOne({ email })
            // .populate({
            //     path: 'completedItems.items',
            //     match: { class: classNum, subject: subject }
            // });

        if (!school) {
            throw new Error('School not found');
        }

        // Get syllabus items
        const syllabus = await Syllabus.findOne({ class: classNum, subject })
            .populate({
                path: 'items',
                populate: {
                    path: 'resource'
                }
            });

        if (!syllabus) {
            throw new Error('Syllabus not found for this class and subject');
        }

        // Get completed items for this class and subject
        // const completedItems = school.completedItems
        //     .filter(item => item.class === classNum && item.subject === subject)
        //     .map(item => item.item);

        // Calculate progress
        const result = {
            schoolInfo: {
                name: school.name,
                email: school.email,
                address: school.address
            },
            classInfo: {
                class: classNum,
                subject: subject
            },
            syllabusItems: syllabus.items,
            completedItems: school.completedItems
            // progress: {
            //     totalItems: syllabus.items.length,
            //     completedItems: completedItems.length,
            //     completionPercentage: (completedItems.length / syllabus.items.length) * 100
            // }
        };

        return result;
    } catch (error) {
        throw new Error(`Error fetching complete items: ${error.message}`);
    }
};

// Validate school data function
const validateSchoolData = (schoolData) => {
    const errors = {};

    if (!schoolData.name || schoolData.name.trim().length === 0) {
        errors.name = 'School name is required';
    }

    if (!schoolData.address || schoolData.address.trim().length === 0) {
        errors.address = 'Address is required';
    }

    if (!schoolData.email) {
        errors.email = 'Email is required';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(schoolData.email)) {
        errors.email = 'Please enter a valid email';
    }

    if (!schoolData.phone) {
        errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(schoolData.phone)) {
        errors.phone = 'Phone number must be 10 digits';
    }

    if (schoolData.completedItems) {
        if (!Array.isArray(schoolData.completedItems)) {
            errors.completedItems = 'Completed items must be an array';
        } else {
            schoolData.completedItems.forEach((item, index) => {
                if (![6, 7, 8].includes(item.class)) {
                    errors[`completedItems.${index}.class`] = 'Class must be 6, 7, or 8';
                }
                if (!['physics', 'chemistry', 'biology'].includes(item.subject)) {
                    errors[`completedItems.${index}.subject`] = 'Subject must be physics, chemistry, or biology';
                }
            });
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Export all functions as SchoolService object
const SchoolService = {
    getSchoolByEmail,
    createSchool,
    getAllSchools,
    updateSchool,
    deleteSchool,
    addCompletedItem,
    removeCompletedItem,
    getSchoolsByStatus,
    getSchoolsByClassAndSubject,
    getCompleteItemsForSchool,
    validateSchoolData
};

module.exports = SchoolService;
