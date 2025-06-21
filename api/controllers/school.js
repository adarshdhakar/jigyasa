const SchoolService = require("../services/school.js");
const StatusCodes = require("http-status-codes");

const createSchool = async function (req, res, next) {
    try {
        const schoolData = req.body;
        console.log(schoolData)
        const createdSchool = await SchoolService.createSchool(schoolData);
        res.status(StatusCodes.OK).json({ data: createdSchool });
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
    }
};

const getAllSchools = async function (req, res, next) {
    try {
        const schools = await SchoolService.getAllSchools();
        res.status(StatusCodes.OK).json({ schools });
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
    }
};

const getSchoolByEmail = async function (req, res, next) {
    try {
        const email = req.body.email;
        const school = await SchoolService.getSchoolByEmail(email);
        res.status(StatusCodes.OK).json({ school });
    } catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({ error: e.message });
    }
};

// const getSchoolById = async function (req, res, next) {
//     try {
//         const id = req.params.id;
//         const school = await SchoolService.getSchoolById(id);
//         res.status(StatusCodes.OK).json({ school });
//     } catch (e) {
//         res.status(StatusCodes.NOT_FOUND).json({ error: e.message });
//     }
// };

const updateSchool = async function (req, res, next) {
    try {
        const email = req.body.email;
        const updateData = req.body.updateData;
        const updatedSchool = await SchoolService.updateSchool(email, updateData);
        res.status(StatusCodes.OK).json({ data: updatedSchool });
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
    }
};

const deleteSchool = async function (req, res, next) {
    try {
        const email = req.body.email;
        const deletedSchool = await SchoolService.deleteSchool(email);
        res.status(StatusCodes.OK).json({ data: deletedSchool });
    } catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({ error: e.message });
    }
};

const addCompletedItems = async function (req, res, next) {
    try {
        const { email, completedItemData } = req.body;
        const updatedSchool = await SchoolService.addCompletedItem(email, completedItemData);
        res.status(StatusCodes.OK).json({ data: updatedSchool });
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
    }
};

const removeCompletedItems = async function (req, res, next) {
    try {
        const { email, completedItemId } = req.body;
        const updatedSchool = await SchoolService.removeCompletedItems(email, completedItemId);
        res.status(StatusCodes.OK).json({ data: updatedSchool });
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
    }
};

const getSchoolsByStatus = async function (req, res, next) {
    try {
        const status = req.params.status;
        const schools = await SchoolService.getSchoolsByStatus(status);
        res.status(StatusCodes.OK).json({ schools });
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
    }
};

const getSchoolsByClassAndSubject = async function (req, res, next) {
    try {
        const { classNum, subject } = req.body;
        const schools = await SchoolService.getSchoolsByClassAndSubject(classNum, subject);
        res.status(StatusCodes.OK).json({ schools });
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
    }
};

const getCompletedItemsOfClassAndSubject = async function (req, res, next) {
    try {
        const email = req.body.email
        const classNum = req.body.classNum
        const subject = req.body.subject

        const resultDoc = await SchoolService.getCompleteItemsForSchool(email, classNum, subject)

        res.status(StatusCodes.OK).json({result: resultDoc})
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    createSchool,
    getAllSchools,
    getSchoolByEmail,
    updateSchool,
    deleteSchool,
    addCompletedItems,
    removeCompletedItems,
    getSchoolsByStatus,
    getSchoolsByClassAndSubject,
    getCompletedItemsOfClassAndSubject
};
