const nodemailer = require('nodemailer');

// Create transporter (Gmail example)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // your Gmail address
        pass: process.env.EMAIL_PASS   // your Gmail app password
    }
});

const scheduleReminder = async (volunteerEmail, schoolMail, scheduleInfo) => {
    const [day, month, year] = scheduleInfo.date.split('-');
    const shiftDate = new Date(`${year}-${month}-${day}T09:00:00`); // defaulting to 9 AM

    const dateStr = shiftDate.toLocaleString();
    const acceptUrl = `http://localhost:5000/schedule/respond/${encodeURIComponent(volunteerEmail)}/${encodeURIComponent(schoolMail)}/accepted`;
    const rejectUrl = `http://localhost:5000/schedule/respond/${encodeURIComponent(volunteerEmail)}/${encodeURIComponent(schoolMail)}/rejected`;

    const htmlContent = `
        <p>Hello,</p>
        <p>This is your invitation for the volunteer shift on <strong>${dateStr}</strong>.</p>
        <p>Please confirm your presence:</p>
        <a href="${acceptUrl}" style="padding: 10px 20px; background: green; color: white; text-decoration: none;">Accept</a>
        &nbsp;
        <a href="${rejectUrl}" style="padding: 10px 20px; background: red; color: white; text-decoration: none;">Reject</a>
    `;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: volunteerEmail,
            subject: `Invitation: Volunteer Shift on ${dateStr}`,
            html: htmlContent
        });

        console.log(`Invitation email sent to ${volunteerEmail}`);
    } catch (err) {
        console.error(`Failed to send email to ${volunteerEmail}:`, err.message);
    }
};

const inviteResponse = async (volunteerEmail ,schoolMail, status) => {
    let htmlcontent

    if (status === "accepted") {
    htmlcontent = `
        <p>hello,</p>
        <p>your session with ${volunteerEmail} has been confirmed</strong>.</p>
    `;
    } else {
    htmlcontent = `
        <p>hello,</p>
        <p>your session with ${volunteerEmail} has been cancelled</strong>.</p>
    `;
    }

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: schoolMail,
            subject: `Confirmation of session`,
            html: htmlcontent
        });

        console.log(`Invitation email sent to ${schoolMail}`);
    } catch (err) {
        console.error(`Failed to send email to ${schoolMail}:`, err.message);
    }
}

module.exports = {
    scheduleReminder,
    inviteResponse
};
