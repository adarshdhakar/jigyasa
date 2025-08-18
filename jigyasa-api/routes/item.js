const express = require("express")
const { addResourceToItemController } = require("../controllers/item.js")

const ItemRoutes = express()

ItemRoutes.post('/addResource', addResourceToItemController)

module.exports = {
    ItemRoutes
}

