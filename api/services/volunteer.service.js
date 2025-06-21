const Volunteer = require('../models/volunteer.model');

const createVolunteer = async (volunteer) => {
    try {
        const newVolunteer = new Volunteer(volunteer);
        await newVolunteer.save();
        return newVolunteer;
    } catch (error) {
        throw new Error(`Error creating volunteer: ${error.message}`);
    }
}

module.exports = {
    createVolunteer
};