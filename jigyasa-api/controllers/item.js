const { StatusCodes } = require("http-status-codes")
const { createResource } = require("../services/resource.js")
const { addResourceToItem } = require("../services/item.js")

const addResourceToItemController = async function (req, res, next) {
    try {
        const resourceData = req.body.resource
        const resource = await createResource(resourceData)

        const item = await addResourceToItem(req.body.item, resource._id)
        res.status(StatusCodes.OK).json({item: item})
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    addResourceToItemController
}
