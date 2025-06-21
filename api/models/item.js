const { default: mongoose } = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name reference is required"]
    },

    resource: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'resource'
    }]
}, {
    collection: 'items',
    timestamps: true
});

const Item = mongoose.model('item', itemSchema);

module.exports = Item;
