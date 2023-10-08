const mongoose = require("mongoose");

const hospitalProfileSchema = new mongoose.Schema(
    {
        sdd: {
            type: String,
            require: true,
            min: 9,
            max: 12,
            unique: true,
        },
        hospitalName: {
            type: String,
            max: 50,
            require: true,
        },
        images: {
            type: Array,
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

module.exports = mongoose.model("HospitalProfile", hospitalProfileSchema);