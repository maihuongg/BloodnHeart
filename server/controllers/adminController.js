const UserProfile = require('../models/userProfileModel');
const AdminProfile = require('../models/adminProfileModel')
const HospitalProfile = require('../models/hospitalProfileModel');
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/email')
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary');

const Validate = require('validator');
const Account = require('../models/accountModel')
const Event = require('../models/eventModel')
const sendMailHospital = require('../utils/sendmailHospital')
const adminController = {
    getAllAccount: async (req, res) => {
        try {
            const allAccount = await Account.find({ password: { $exists: true, $ne: null } });
            const accountCount = allAccount.length;
            return res.status(200).json({ count: accountCount, allAccount });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
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
    deleteAccountbyId: async (req, res) => {
        try {
            const accountId = req.params.id;
            console.log(accountId)
            const user = await Account.findByIdAndDelete({ _id: accountId });
            if (!user) {
                return res.status(404).json({ message: "Không tim thấy tài khoản" });
            }
            return res.status(200).json({ message: "Thanh cong !." });

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
                // return res.status(200).json({ user, adminProfile });
                return res.status(200).json(adminProfile);

            }
            else if (isHospital) {
                const hospitalProfile = await HospitalProfile.findOne({ account_id: accountId })
                return res.status(200).json(hospitalProfile)
            }
            else {
                const userProfile = await UserProfile.findOne({ account_id: accountId })
                return res.status(200).json(userProfile);
            }

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
    //dùng cho đăng ký bệnh viện hợp tác

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
                        localField: 'cccd',
                        foreignField: 'cccd',
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
            const { cccd, password1, repeatPassword } = req.body
            if (!password1 || !repeatPassword) {
                return res.status(400).json({ message: "Trường thông tin không được để trống" });
            }
            if (password1 !== repeatPassword) {
                return res.status(400).json({ message: "Mật khẩu không khớp" });
            }
            const user = await Account.findOne({ cccd: req.body.cccd });
            const account_id = user._id;
            console.log("user", user)
            // Update password
            const salt = await bcrypt.genSalt(14);
            const password = await bcrypt.hash(password1, salt);
            const updatePassword = await Account.findOneAndUpdate(
                { cccd: cccd },
                { $set: { password } },
                { new: true }
            );
            const updateProfileHospital = await HospitalProfile.findOneAndUpdate(
                { cccd: cccd },
                { $set: { account_id } },
                { new: true }
            );
            //gửi mail xác nhận
            const emailResponse = await sendMailHospital(user, password1);
            console.log('Email response:', emailResponse);
            return res.status(200).json({
                updatePassword,
                updateProfileHospital,
                message: 'Chúng tôi đã gửi một hộp thư thay đổi mật khẩu đến địa chỉ email mà bạn đã đăng ký. Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn để hoàn tất quá trình thay đổi mật khẩu. '
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    updateUserImage: async (req, res) => {
        try {
            const accountId = req.params.id;
            console.log('accountId', accountId);
            const base64Image = req.body.images;
            //cloudinary
            const result = await cloudinary.v2.uploader.upload(req.body.images, {
                folder: 'profile',
                width: 200,
                crop: "scale"
            })
            console.log('url', result.secure_url);
            const imageurl = result.secure_url;
            // update
            const userProfile = await UserProfile.findOneAndUpdate(
                { account_id: accountId },
                { $set: { images: imageurl } },
                { new: true }
            );

            if (!userProfile) {
                return res.status(404).json({ message: 'User profile not found' });
            }

            return res.status(200).json(userProfile);
        } catch (error) {
            return res.status(500).json({ error });
        }
    },
    updateUserInfo: async (req, res) => {
        try {
            const accountId = req.params.id;
            const { fullName, gender, birthDay, phone, address } = req.body;

            const userProfile = await UserProfile.findOneAndUpdate(
                { account_id: accountId },
                { $set: { fullName, gender, birthDay, phone, address } },
                { new: true }
            );

            if (!userProfile) {
                return res.status(404).json({ message: 'User profile not found' });
            }

            return res.status(200).json(userProfile);
        } catch (error) {
            return res.status(500).json({ error });
        }
    },
    getAllHospital: async (req, res) => {
        try {
            const allHospital = await HospitalProfile.find({ account_id: { $exists: true, $ne: null } });
            const eventCount = allHospital.length;
            return res.status(200).json({ count: eventCount, allHospital });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getHospitalProfileByAccountId: async (req, res) => {
        try {
            const accountId = req.params.id;
            console.log(accountId)
            const hospitalProfile = await HospitalProfile.findOne({ _id: accountId });
            if (!hospitalProfile) {
                return res.status(404).json({ message: "Không tim thấy tài khoản" });
            }
            return res.status(200).json(hospitalProfile);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    updateHospitalImage: async (req, res) => {
        try {
            const id = req.params.id;

            const base64Image = req.body.images;
            //cloudinary
            const result = await cloudinary.v2.uploader.upload(req.body.images, {
                folder: 'profile',
                width: 200,
                crop: "scale"
            })
            console.log('url', result.secure_url);
            const imageurl = result.secure_url;
            // update
            const hospitalprofiles = await HospitalProfile.findOneAndUpdate(
                { _id: id },
                { $set: { images: imageurl } },
                { new: true }
            );

            if (!hospitalprofiles) {
                return res.status(404).json({ message: 'User profile not found' });
            }

            return res.status(200).json(hospitalprofiles);
        } catch (error) {
            return res.status(500).json({ error });
        }
    },
    updateHospitalInfo: async (req, res) => {
        try {
            const id = req.params.id;
            const { hospitalName, leaderName, phone, address } = req.body;
            console.log(req.body);

            const hospitalProfile = await HospitalProfile.findOneAndUpdate(
                { _id: id },
                { $set: { hospitalName, leaderName, phone, address } },
                { new: true }
            );

            if (!hospitalProfile) {
                return res.status(404).json({ message: 'User profile not found' });
            }

            return res.status(200).json(hospitalProfile);
        } catch (error) {
            return res.status(500).json({ error });
        }
    },
    //search keyword Account
    searchAccount: async (req, res) => {
        try {
            const { keyword } = req.query;
            const findAccount = await Account.find({
                $and: [
                    { $or: [{ email: new RegExp(keyword, 'i') }] },
                    { password: { $exists: true, $ne: null } }
                ]

            });
            res.status(200).json(findAccount);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    searchHospital: async (req, res) => {
        try {
            const { keyword } = req.query;
            const findHospital = await HospitalProfile.find({
                $or: [
                    
                    { hospitalName: new RegExp(keyword, 'i') }
                ],
                account_id: { $exists: true, $ne: null }

            });

            return res.status(200).json(findHospital);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    searchEvent: async (req, res) => {
        try {
            const { keyword } = req.query;
            const findHospital = await Event.find({
                $or: [
                    
                    { eventName: new RegExp(keyword, 'i') }
                ],
            });
            return res.status(200).json(findHospital);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
}
module.exports = adminController;