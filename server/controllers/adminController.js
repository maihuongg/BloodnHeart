const UserProfile = require('../models/userProfileModel');
const AdminProfile = require('../models/adminProfileModel')
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/email')
const Validate = require('validator');
const Account = require('../models/accountModel')
const adminController ={
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
}
module.exports= adminController;