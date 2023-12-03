const UserProfile = require('../models/userProfileModel');
const AdminProfile = require('../models/adminProfileModel')
const HospitalProfile = require('../models/hospitalProfileModel');
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/email')
const Validate = require('validator');
const Account = require('../models/accountModel')
const Event = require('../models/eventModel')
const adminController = {
    getAdminById: async (req, res) => {
        try {
            const accountId = req.params.account_id;
            console.log(accountId)
            const user = await AdminProfile.findOne({ account_id: accountId });

            if (!user) {
                return res.status(404).json({ message: "Admin not found" });
            }
            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },

    getAllEvent: async (req, res) => {
        try {
            const allEvent = await Event.find();
            const eventCount = allEvent.length;
            return res.status(200).json({ count: eventCount, allEvent });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getAccountById: async (req, res) => {
        try {
            const accountId = req.params.id;
            console.log(accountId)
            const user = await Account.findOne({ _id: accountId });
            if (!user) {
                return res.status(404).json({ message: "Không tim thấy tài khoản" });
            }
            return res.status(200).json(user);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    getInfoByAccountId: async (req, res) => {
        try {
            const accountId = req.params.id;
            console.log(accountId)
            const user = await Account.findOne({ _id: accountId });
            if (!user) {
                return res.status(404).json({ message: "Không tim thấy tài khoản" });
            }
            const isAdmin = user.isAdmin;
            const isHospital = user.isHospital;
            if (isAdmin) {
                const adminProfile = await AdminProfile.findOne({ account_id: accountId });
                return res.status(200).json({user, adminProfile});
            }
            else if (isHospital) {
                const hospitalProfile = await HospitalProfile.findOne({ account_id: accountId })
                return res.status(200).json({user, hospitalProfile});
            }
            else
                return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
module.exports = adminController;