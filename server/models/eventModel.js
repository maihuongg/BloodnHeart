const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {

        hospital_id:{type: String},
        eventName: {
            type: String,
            max: 50,
            require: true,
        },
        images: {
            type: String,
            require: true,
            default: 'https://res.cloudinary.com/bloodnheart/image/upload/v1700060680/image-default/default_image_profile_mdpdlu.jpg',
        },
        date_start:{
            type: Date,
            require: true,
            default: null,
        },
        date_end:{
            type: Date,
            require: true,
            default: null,
        },
        amount:{
            type: Number,
            require: true,
            default: 0
        },
        address: {
            type: String,
            require: true,
            default: null,
        },
        listusers:  [{
            userid: {
                type: String,
                require: true,
            },
            bloodgroup: {
                type: String,
                require: true,
            },
            status:{
                type: String,
                require: true,
            },
            dateregister: {
                type: Date,
                require: true,
            }
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Events", eventSchema);