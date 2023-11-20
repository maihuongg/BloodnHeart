const HospitalProfile = require('../models/hospitalProfileModel')
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/email')
const Validate = require('validator');
const Event = require('../models/eventModel')
const hospitalController ={
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
    getEventByHospital: async (req, res) => {
        try {
            const hospitalId = req.params.hospital_id;
            const allEvent = await Event.find({hospital_id: hospitalId});
            const eventCount = allEvent.length;
            return res.status(200).json({count: eventCount, allEvent});
        } catch (error) {
            return res.status(500).json(error);
        }
    },
}
module.exports= hospitalController;