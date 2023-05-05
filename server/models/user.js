const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: [50, "Name should not be more than 50 characters!"]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    rollNo : {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 8,
    },
    isAdmin: {
        type: Number,
        default: 0, // 1 for 'admin', 0 for 'notAdmin'
    },
    branch: {
        type: String,
        trim: true,
    },
    overAllCGPA: {
        type: String,
        trim: true,
        min: 0,
        max: 10,
    },
    _12thPercent: {
        type: String,
        trim: true,
        min: 0,
        max: 100,
    },
    _10thPercent: {
        type: String,
        trim: true,
        min: 0,
        max: 100,
    },
    backlogCount: {
        type: Number,
        default: 0,
    },
    dob: {
        type: Date,
        trim: true,
    },
    caste: {
        type: String,
    },
    address: {
        type: String,
        trim: true,
    },
    isBlacklisted: {
        type: Boolean,
        default: false,
    },
    isT1Placed: {
        type: Boolean,
        default: false,
    },
    isT2Placed: {
        type: Number,
        default: 0, // 0 for 'No', 1 for 'Core', 2 for ' IT', 3 for 'Others'
    }
},{timestamps: true})

module.exports = mongoose.model("User", userSchema);