const Resource = require("../models/resource.js")
const { addResourceToItem } = require("./item.js")

const createResource = async function (resourceData) {
    const resource = new Resource(resourceData)
    const savedResource = await resource.save()
    return savedResource
}

module.exports = {
    createResource
}
