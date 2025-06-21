const { default: mongoose } = require("mongoose");

const adminSchema = new mongoose.Schema({
    mail: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },
        },
        unique: true,
        index: true
    },
})

const Admin = new mongoose.model('admin', adminSchema)

module.exports = {
    Admin
}
