const VolunteerApplication = require('../models/Volunteer');

const createVolunteerApplication = async (applicationData) => {
    try {
        const newApplication = new VolunteerApplication(applicationData);
        await newApplication.save();
        return newApplication;
    } catch (error) {
        throw new Error(`Error creating volunteer application: ${error.message}`);
    }
};

module.exports = {
    createVolunteerApplication
};