const ApplicantService = require("../services/applicant.js")
const StatusCodes = require("http-status-codes")

const createApplicant = async function(req, res, next) {
    try {
        console.log("REQ:")
        console.log(req.body)
        const applicantDoc = req.body
        console.log(req.body)

        const createdApplicant = await ApplicantService.createApplicant(applicantDoc)
        res.status(StatusCodes.OK).json({data: createdApplicant})
    } catch (e) {
        // console.log(e)
    }
}

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
