const { scheduleReminder, inviteResponse } = require("../services/mail.js")

const schedule = async (req, res) => {
    const volunteerMail = req.body.volunteerMail
    const schoolMail = req.body.schoolMail
    const scheduleInfo = req.body.scheduleInfo

    scheduleReminder(volunteerMail, schoolMail, scheduleInfo)
    res.status(200).json({"ok": "ok"})
}

const response = async (req, res) => {
    const volunteerMail = req.params.volunteerMail
    const schoolMail = req.params.schoolMail
    const status = req.params.status
    inviteResponse(volunteerMail, schoolMail, status)

    res.status(200).json({"OK": "OK"})
}

module.exports = {
    schedule,
    response
}
