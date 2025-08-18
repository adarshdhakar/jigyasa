const express = require("express")
const { createSyllabusController, addItemsToSyllabusController } = require("../controllers/syllabus.js")

const SyllabusRoutes = express()

SyllabusRoutes.post('/create', createSyllabusController)
SyllabusRoutes.post('/addItems', addItemsToSyllabusController)

module.exports = {
    SyllabusRoutes
}
