const { StatusCodes } = require("http-status-codes")
const VolunteerApplication = require('../models/Volunteer.js');
const VolunteerService = require('../services/volunteer.service');


const createVolunteerApplication = async (applicationData) => {
    try {
        const newApplication = new VolunteerApplication(applicationData);
        await newApplication.save();
        return newApplication;
    } catch (error) {
        throw new Error(`Error creating volunteer application: ${error.message}`);
    }
};

const getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await VolunteerService.getAllVolunteers();
        res.status(StatusCodes.OK).json({ volunteers });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

module.exports = {
    getAllVolunteers,
    createVolunteerApplication
};