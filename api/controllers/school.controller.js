const School = require('../models/school'); // adjust path as needed
const VolunteerApplication = require('../models/Volunteer'); 

const getAllSchools = async (req, res) => {
    const { volunteerID } = req.body;
    const volunteer = await VolunteerApplication.findOne({ volunteerID }).populate('schools', 'name _id');

    if (!volunteer) {
        return res.status(404).json({ message: 'Volunteer not found' });
    }

    const assignedSchools = volunteer.schools.map(school => ({
        _id: school._id,
        name: school.name
    }));

    res.status(200).json({
        volunteerID: volunteer.volunteerID,
        volunteerName: volunteer.name,
        assignedSchools
    });
};

const getSchoolById = async (req, res) => {
    try {
        const { schoolId } = req.params;
        const school = await School.findById(schoolId);
        if (!school) {
            return res.status(404).json({ message: 'School not found' });
        }

        res.status(200).json(school);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching school', error: error.message });
    }
};

module.exports = { getAllSchools, getSchoolById };
