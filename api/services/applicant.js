const { default: mongoose } = require('mongoose');
const VolunteerApplication = require('../models/Volunteer.js');
const Applicant = require('../models/applicant');

// Create applicant function
const createApplicant = async (applicantData) => {
    try {
        const applicant = new Applicant(applicantData);
        const savedApplicant = await applicant.save();
        return savedApplicant;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new Error(`Validation Error: ${error.message}`);
        }
        throw new Error(`Error creating applicant: ${error.message}`);
    }
};

// Get all applicants function
const getAllApplicants = async (filters = {}) => {
    try {
        const applicants = await Applicant.find(filters);
        return applicants;
    } catch (error) {
        throw new Error(`Error fetching applicants: ${error.message}`);
    }
};

// Get applicant by email function
const getApplicantByEmail = async (email) => {
    try {
        const applicant = await Applicant.findOne({ mail: email });
        if (!applicant) {
            throw new Error('Applicant not found');
        }
        return applicant;
    } catch (error) {
        throw new Error(`Error fetching applicant: ${error.message}`);
    }
};

// Update applicant function
const updateApplicant = async (id, updateData) => {
    try {
        const applicant = await Applicant.findByIdAndUpdate(
            id,
            updateData,
            { 
                new: true,
                runValidators: true
            }
        );
        
        if (!applicant) {
            throw new Error('Applicant not found');
        }
        
        return applicant;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new Error(`Validation Error: ${error.message}`);
        }
        if (error.name === 'CastError') {
            throw new Error('Invalid applicant ID format');
        }
        throw new Error(`Error updating applicant: ${error.message}`);
    }
};

// Delete applicant function
const deleteApplicant = async (id) => {
    try {
        const applicant = await Applicant.findByIdAndDelete(id);
        if (!applicant) {
            throw new Error('Applicant not found');
        }
        return applicant;
    } catch (error) {
        if (error.name === 'CastError') {
            throw new Error('Invalid applicant ID format');
        }
        throw new Error(`Error deleting applicant: ${error.message}`);
    }
};

// Search applicants function
const searchApplicants = async (searchCriteria) => {
    try {
        const query = {};
        
        if (searchCriteria.name) {
            query.name = { $regex: searchCriteria.name, $options: 'i' };
        }
        if (searchCriteria.location) {
            query.location = { $regex: searchCriteria.location, $options: 'i' };
        }
        if (searchCriteria.qualifications) {
            query.qualifications = { $in: searchCriteria.qualifications };
        }
        if (searchCriteria.gender) {
            query.gender = searchCriteria.gender;
        }
        if (searchCriteria.ageRange) {
            query.age = {
                $gte: searchCriteria.ageRange.min,
                $lte: searchCriteria.ageRange.max
            };
        }

        const applicants = await Applicant.find(query);
        return applicants;
    } catch (error) {
        throw new Error(`Error searching applicants: ${error.message}`);
    }
};

// Get applicants by qualification function
const getApplicantsByQualification = async (qualification) => {
    try {
        const applicants = await Applicant.find({
            qualifications: { $in: [qualification] }
        });
        return applicants;
    } catch (error) {
        throw new Error(`Error fetching applicants by qualification: ${error.message}`);
    }
};

// Get applicants by location function
const getApplicantsByLocation = async (location) => {
    try {
        const applicants = await Applicant.find({
            location: { $regex: location, $options: 'i' }
        });
        return applicants;
    } catch (error) {
        throw new Error(`Error fetching applicants by location: ${error.message}`);
    }
};

// Validate applicant data function
const validateApplicantData = (applicantData) => {
    const errors = {};

    if (!applicantData.name || applicantData.name.trim().length === 0) {
        errors.name = 'Name is required';
    }

    if (!applicantData.age || applicantData.age < 18 || applicantData.age > 100) {
        errors.age = 'Age must be between 18 and 100';
    }

    if (!applicantData.gender || !['Male', 'Female', 'Other'].includes(applicantData.gender)) {
        errors.gender = 'Gender must be Male, Female, or Other';
    }

    if (!applicantData.qualifications || !Array.isArray(applicantData.qualifications) || applicantData.qualifications.length === 0) {
        errors.qualifications = 'At least one qualification is required';
    }

    if (!applicantData.location || applicantData.location.trim().length === 0) {
        errors.location = 'Location is required';
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!applicantData.mail || !emailRegex.test(applicantData.mail)) {
        errors.mail = 'Valid email is required';
    }

    if (!applicantData.number || !/^\d{10}$/.test(applicantData.number)) {
        errors.number = 'Valid 10-digit phone number is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

const acceptApplicant = async (applicantId) => {
    console.log("id:" + applicantId)
    const applicant = await Applicant.findOne({_id: applicantId})

    console.log("A:")
    console.log(applicant)

    const volunteerDoc = {
        volunteerID: 1,
        name: applicant.name,
        age: applicant.age,
        HighestQualification: "dummy",
        Location: applicant.location,
        email: applicant.mail,
        PhoneNumber: applicant.number
    }

    console.log("V:")
    console.log(volunteerDoc)

    const volunteer = new VolunteerApplication(volunteerDoc)
    await volunteer.save()

    await Applicant.deleteOne({_id: applicantId})

    return volunteer
}

// Export all functions as Admin object
const ApplicantService = {
    createApplicant,
    getAllApplicants,
    getApplicantByEmail,
    updateApplicant,
    deleteApplicant,
    searchApplicants,
    getApplicantsByQualification,
    getApplicantsByLocation,
    validateApplicantData,
    acceptApplicant
};

module.exports = ApplicantService; 