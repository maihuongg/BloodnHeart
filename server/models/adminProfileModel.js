const mongoose = require("mongoose");

const adminProfileSchema = new mongoose.Schema(
    {
        cccd: {
            type: String,
            require: true,
            min: 9,
            max: 12,
            unique: true,
        },
        adminName: {
            type: String,
            max: 50,
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
    },
    { timestamps: true }
);

module.exports = mongoose.model("AdminProfile", adminProfileSchema);