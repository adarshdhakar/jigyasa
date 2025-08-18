require('dotenv').config();

const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
const notificationRoutes = require('./routes/notifications.routes');
const volunteerRoutes = require('./routes/volunteers.routes');
const schoolRoutes = require('./routes/schools.routes');
const quizRoutes = require('./routes/quiz.routes');
const chapterRoutes = require('./routes/chapter.routes');
const { ApplicantRoutes } = require("./routes/applicant.js")
const { SchoolRoutes } = require("./routes/school.js")
const { ItemRoutes } = require("./routes/item.js")
const { SyllabusRoutes } = require("./routes/syllabus.js")
const { ScheduleRoutes } = require("./routes/schedule.js")

const port = process.env.PORT;

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend is healthy",
    timestamp: new Date().toISOString(),
  });
});
app.get("/", (req, res) => {
  res.send("Hello from Node.js backend!");
});

app.use('/api/notifications', notificationRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/applicant', ApplicantRoutes)
app.use('/school', SchoolRoutes)
app.use('/item', ItemRoutes)
app.use('/syllabus', SyllabusRoutes)
app.use('/schedule', ScheduleRoutes)

app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});