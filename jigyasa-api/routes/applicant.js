const express = require("express")
const { createApplicant, getAllApplicants, getApplicantByEmail, acceptApplicantController } = require("../controllers/applicant.js")

const ApplicantRoutes = express()

ApplicantRoutes.get('/all', getAllApplicants)
ApplicantRoutes.get('/', getApplicantByEmail)
ApplicantRoutes.post('/create', createApplicant)
ApplicantRoutes.post('/accept', acceptApplicantController)

module.exports = {
    ApplicantRoutes
}
