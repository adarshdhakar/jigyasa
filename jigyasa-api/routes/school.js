const express = require("express");
const {
    createSchool,
    getAllSchools,
    getSchoolByEmail,
    getSchoolById,
    updateSchool,
    deleteSchool,
    addCompletedItems,
    removeCompletedItems,
    getSchoolsByStatus,
    getSchoolsByClassAndSubject,
    getCompletedItemsOfClassAndSubject
} = require("../controllers/school.js");
const { getCompleteItemsForSchool } = require("../services/school.js");

const SchoolRoutes = express();

// GET all schools
SchoolRoutes.get('/all', getAllSchools);

// GET school by email (email sent in body)
SchoolRoutes.get('/by-email', getSchoolByEmail);

// GET school by ID (id sent in URL param)
// SchoolRoutes.get('/:id', getSchoolById);

// POST create new school
SchoolRoutes.post('/create', createSchool);

// PUT update school by email
SchoolRoutes.put('/update', updateSchool);

// DELETE school by email
SchoolRoutes.delete('/delete', deleteSchool);

// POST add completed item
SchoolRoutes.post('/addCompletedItem', addCompletedItems);

// POST remove completed item
SchoolRoutes.post('/completed/remove', removeCompletedItems);

// GET schools by status (status sent in URL param)
SchoolRoutes.get('/status/:status', getSchoolsByStatus);

// POST get schools by class and subject
SchoolRoutes.post('/filter/class-subject', getSchoolsByClassAndSubject);

SchoolRoutes.get('/completedItems', getCompletedItemsOfClassAndSubject)

module.exports = {
    SchoolRoutes
};

