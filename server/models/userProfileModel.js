const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
    {
        cccd: {
            type: String,
            require: true,
            min: 9,
            max: 12,
            unique: true,
        },
        fullName: {
            type: String,
            max: 50,
            require: true,
        },
        gender: {
            type: String,
            require: true,
            max: 4,
        },
        images: {
            type: Array,
            require: true,
        },
        birthDay:{
            type: Date,
            require: true,
        },
        phone: {
            type: String,
            require: true,
            min: 10,
            max: 11,
            unique: true,
        },
        email: {
            type: String,
            require: true,
            max: 50,
            unique: true,
        },
        address: {
            type: String,
            require: true,
        },
        bloodgroup:{
            type: String,
            require: true,
            max: 10
        },
        history: [{
            date: {
                type: Date,
                require: true,
            },
            id_event: {
                type: String,
                require: true,
            },
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserProfile", userProfileSchema);