const ApplicantService = require("../services/applicant.js")
const StatusCodes = require("http-status-codes")

const createApplicant = async function(req, res, next) {
    try {
        const body = req.body;

        const applicantDoc = {
            name: body.name,
            age: body.age,
            gender: body.gender === "M" ? "Male" : body.gender === "F" ? "Female" : "Other",
            qualifications: body.qualification, // assuming client sends singular
            location: body.location,
            mail: body.email,
            number: body.phone
        };

        const createdApplicant = await ApplicantService.createApplicant(applicantDoc);
        res.status(StatusCodes.CREATED).json({ success: true, data: createdApplicant });
    } catch (e) {
        console.error("Error creating applicant:", e.message);
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, error: e.message });
    }
};


const getAllApplicants = async function(req, res, next) {
    try {
        const applicantsData = await ApplicantService.getAllApplicants()
        res.status(StatusCodes.OK).json({applicants: applicantsData})
    } catch (e) {
        // console.log(e)
    }
}

const getApplicantByEmail = async function(req, res, next) {
    console.log(req.body)
    const email = req.body.email
    const applicant = await ApplicantService.getApplicantByEmail(email)
    res.status(StatusCodes.OK).json({applicant: applicant})
}

const acceptApplicantController = async function(req, res, next) {
    console.log(req.body)
    const id = req.body.applicantId
    const volunteer = await ApplicantService.acceptApplicant(id)
    res.status(StatusCodes.OK).json({volunteer: volunteer})
}

module.exports = {
    createApplicant,
    getAllApplicants,
    getApplicantByEmail,
    acceptApplicantController
}
