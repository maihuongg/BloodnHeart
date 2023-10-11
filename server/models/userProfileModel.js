const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
    {
        account_id:{type: String},
        cccd: {
            type: String,
            required: true,
            min: 9,
            max: 12,
            unique: true,
        },
        fullName: {
            type: String,
            max: 50,
            require: true,
            default: null,
        },
        gender: {
            type: String,
            require: true,
            max: 4,
            default: null,
        },
        images: {
            type: String,
            require: true,
            default: null,
        },
        birthDay:{
            type: Date,
            require: true,
            default: null,
        },
        phone: {
            type: String,
            require: true,
            min: 10,
            max: 11,
            default: null,
            
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
            default: null,
        },
        bloodgroup:{
            type: String,
            require: true,
            max: 10,
            default: null,

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