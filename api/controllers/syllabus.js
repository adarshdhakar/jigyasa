const { StatusCodes } = require("http-status-codes")
const { createItem } = require("../services/item.js")
const {addItemsToSyllabus, createSyllabus} = require("../services/syllabus.js")

const addItemsToSyllabusController = async function (req, res, next) {
    try {
        const itemDoc = req.body.item
        const item = await createItem(itemDoc)

        await addItemsToSyllabus(req.body.class, req.body.subject, item._id)
        res.status(StatusCodes.OK).json({ok: "ok"})
    } catch (e) {
        console.log(e)
    }
}

const createSyllabusController = async function (req, res, next) {
    try {
        console.log(req.body)
        const syllabusDoc = req.body
        await createSyllabus(syllabusDoc)
        res.status(StatusCodes.OK).json({ok: "ok"})
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    addItemsToSyllabusController,
    createSyllabusController
}
