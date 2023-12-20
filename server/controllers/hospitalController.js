const HospitalProfile = require('../models/hospitalProfileModel')
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/email')
const Validate = require('validator');
const Event = require('../models/eventModel')
const hospitalController = {
    getHospitalById: async (req, res) => {
        try {
            const accountId = req.params.account_id;
            console.log(accountId)
            const user = await HospitalProfile.findOne({ account_id: accountId });

            if (!user) {
                return res.status(404).json({ message: "Hospital not found" });
            }
            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    getEventById: async (req, res) => {
        try {
            const id = req.params.id;
            const event = await Event.findOne({ _id: id });

            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }

            // Count the number of users in the listusers array
            const userCount = event.listusers.length;

            // Add the userCount to the event object
            const eventWithUserCount = { ...event.toObject(), count: userCount };

            return res.status(200).json({ message: "Event found", eventWithUserCount});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    getEventByHospital: async (req, res) => {
        try {
            const hospitalId = req.params.hospital_id;
            const allEvent = await Event.find({ hospital_id: hospitalId });
            const eventCount = allEvent.length;
            return res.status(200).json({ count: eventCount, allEvent });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    addEvent: async (req, res) => {
        try {
            // console.log('name', req.body.eventName);
            // const result = await cloudinary.v2.uploader.upload(req.body.images, {
            //     folder: 'event',
            //     width: 150,
            //     crop: "scale"
            // })

            // const imageurl = result.secure_url;
            // images: imageurl,
            const newEvent = new Event({
                hospital_id: req.body.hospital_id,
                eventName: req.body.eventName,
                date_start: req.body.date_start,
                date_end: req.body.date_end,
                amount: req.body.amount,
                address: req.body.address,
            })
            const event = await newEvent.save();
            return res.status(200).json(event);

        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getEventById: async (req, res) => {
        try {
            const eventId = req.params.id;
            console.log(eventId);
            const event = await Event.findOne({ _id: eventId })
            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }
            return res.status(200).json(event);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    closeEvent: async (req, res) => {
        try {
            const eventId = req.params.id;
            const eventClose = await Event.findOneAndUpdate(
                { _id: eventId },
                { $set: { status: "0" } },
                { new: true }
            );

            if (!eventClose) {
                return res.status(404).json({ message: 'Event not found' });
            }

            return res.status(200).json(eventClose);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    getFourHospital: async (req, res) => {
        try {
            const hospital = await HospitalProfile.find().limit(4);
            return res.status(200).json(hospital);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
module.exports = hospitalController;