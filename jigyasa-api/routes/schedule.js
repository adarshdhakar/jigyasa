const express = require("express")
const { schedule, response } = require("../controllers/schedule.js")

const ScheduleRoutes = express()

ScheduleRoutes.post('/', schedule)
ScheduleRoutes.use('/respond/:volunteerMail/:schoolMail/:status', response)

module.exports = {
    ScheduleRoutes
}
