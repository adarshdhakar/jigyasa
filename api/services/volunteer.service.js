const Volunteer = require('../models/Volunteer.js');

const createVolunteer = async (volunteer) => {
    try {
        const newVolunteer = new Volunteer(volunteer);
        await newVolunteer.save();
        return newVolunteer;
    } catch (error) {
        throw new Error(`Error creating volunteer: ${error.message}`);
    }
}

const getAllVolunteers = async () => {
    try {
        return await Volunteer.find().populate('schools'); // populate school details if needed
    } catch (error) {
        throw new Error(`Error fetching volunteers: ${error.message}`);
    }
};

module.exports = {
    createVolunteer,
    getAllVolunteers
};