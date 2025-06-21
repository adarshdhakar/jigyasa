const { default: mongoose } = require("mongoose");

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    }
    
}, {
    collection: 'resources',
    timestamps: true
});

const Resource = mongoose.model('resource', resourceSchema);

module.exports = Resource;
