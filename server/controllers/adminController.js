const UserProfile = require('../models/userProfileModel');
const AdminProfile = require('../models/adminProfileModel')
const HospitalProfile = require('../models/hospitalProfileModel');
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/email')
const bcrypt = require('bcrypt');

const Validate = require('validator');
const Account = require('../models/accountModel')
const Event = require('../models/eventModel')
const sendMailHospital = require('../utils/sendmailHospital')
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
                return res.status(200).json({ user, adminProfile });
            }
            else if (isHospital) {
                const hospitalProfile = await HospitalProfile.findOne({ account_id: accountId })
                return res.status(200).json({ user, hospitalProfile });
            }
            else
                return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    getTobeHospital: async (req, res) => {
        try {
            const users = await Account.find({ password: { $exists: false } });

            if (!users || users.length === 0) {
                return res.status(404).json({ message: "Không tìm thấy yêu cầu nào." });
            }

            return res.status(200).json(users);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    getHospitalbyAccountId: async (req, res) => {
        try {
            const users = await Account.aggregate([
                {
                    $match: {
                        password: { $exists: false },
                    },
                },
                {
                    $lookup: {
                        from: 'hospitalprofiles',
                        localField: '_id',
                        foreignField: 'account_id',
                        as: 'profile',
                    },
                },
            ]);
            return res.status(200).json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    setAcceptHospital: async (req, res) => {
        try {
            // const cccd = req.params.cccd;
            // console.log(cccd)
            const { cccd,password1, repeatPassword } = req.body
            if (!password1 || !repeatPassword) {
                return res.status(400).json({ message: "Trường thông tin không được để trống" });
            }
            if (password1 !== repeatPassword) {
                return res.status(400).json({ message: "Mật khẩu không khớp" });
            }        
            const user = await Account.findOne({ cccd: req.body.cccd });
            console.log("user", user)
            // Update password
            const salt = await bcrypt.genSalt(14);
            const password = await bcrypt.hash(password1, salt);
            const updatePassword = await Account.findOneAndUpdate(
                { cccd: cccd },
                { $set: { password } },
                { new: true }
            );
            //gửi mail xác nhận
            const emailResponse = await sendMailHospital(user, password1);
            console.log('Email response:', emailResponse);
            return res.status(200).json({
                updatePassword,
                message: 'Chúng tôi đã gửi một hộp thư thay đổi mật khẩu đến địa chỉ email mà bạn đã đăng ký. Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn để hoàn tất quá trình thay đổi mật khẩu. '
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

}
module.exports = adminController;