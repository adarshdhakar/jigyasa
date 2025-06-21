const { default: mongoose } = require("mongoose");

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "School name is required"],
        trim: true
    },

    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true
    },

    contact: {
        email: {
            type: String,
            required: [true, "Email is required"],
            validate: {
                validator: function(email) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                },
                message: "Please enter a valid email"
            }
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            validate: {
                validator: function(v) {
                    return /^\d{10}$/.test(v);
                },
                message: "Phone number must be 10 digits"
            }
        }
    },

    completedItems: [{
        class: {
            type: Number,
            required: [true, "Class is required"],
            enum: {
                values: [6, 7, 8],
                message: "Class must be either 6, 7, or 8"
            }
        },
        subject: {
            type: String,
            required: [true, "Subject is required"],
            enum: {
                values: ['physics', 'chemistry', 'biology'],
                message: "Subject must be physics, chemistry, or biology"
            }
        },
        items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'item'
        }],
        completedAt: {
            type: Date,
            default: Date.now
        }
    }],

    status: {
        type: String,
        default: 'active'
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Middleware to update the updatedAt timestamp
schoolSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Method to get school details with populated items
schoolSchema.methods.getSchoolDetails = async function() {
    await this.populate('completedItems.items');
    return this;
};

// Method to get total completed items
schoolSchema.methods.getTotalCompletedItems = function() {
    return this.completedItems.reduce((total, item) => total + item.items.length, 0);
};

// Method to get completed items by class and subject
schoolSchema.methods.getCompletedItemsByClassAndSubject = function(classNum, subject) {
    return this.completedItems.filter(item => 
        item.class === classNum && item.subject === subject
    );
};

const School = mongoose.model('school', schoolSchema);

module.exports = School;