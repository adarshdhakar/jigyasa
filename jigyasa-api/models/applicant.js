const { default: mongoose } = require("mongoose");

const applicantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },

    age: {
        type: Number,
        required: [true, "Age is required"]
    },

    gender: {
        type: String, 
        required: [true, "Gender is required"],
        enum: ["Male", "Female", "Other"]
    },

    qualifications: {
        type: [String],
        required: [true, "Atleast one qualification is required"]
    },

    location: {
        type: String,
        required: [true, "Location is required"]
    },

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

    number: {
        type: String,
        require: [true, "Number is required"],
        validate: {
            validator: function(number) {
                return number && number.length == 10
            }
        }
    }
},
    {
        collection: 'applicants'
    })

const Applicant = mongoose.model('applicant', applicantSchema)

module.exports = Applicant
