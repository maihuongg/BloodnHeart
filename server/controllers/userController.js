const UserProfile = require('../models/userProfileModel');
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/email')
const Validate = require('validator');
const Account = require('../models/accountModel')
const cloudinary = require('cloudinary');
const Event = require('../models/eventModel')
const HospitalProfile = require('../models/hospitalProfileModel')


const userController = {
    getUserById: async (req, res) => {
        try {
            const accountId = req.params.account_id;
            console.log(accountId)
            const user = await UserProfile.findOne({ account_id: accountId });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    updateProfile: async (req, res) => {
        try {
            const accountId = req.params.account_id;
            const { fullName, gender, images, birthDay, phone, email, address, bloodgroup } = req.body;

            const userProfile = await UserProfile.findOneAndUpdate(
                { account_id: accountId },
                { $set: { fullName, gender, images, birthDay, phone, email, address, bloodgroup } },
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

    updateProfileImage: async (req, res) => {
        try {
            const accountId = req.params.account_id;
            console.log('accountId', accountId);
            const base64Image = req.body.images;
            //console.log('img1',base64Image);

            const result = await cloudinary.v2.uploader.upload(req.body.images, {
                folder: 'profile',
                width: 150,
                crop: "scale"
            })

            console.log('url', result.secure_url);

            const imageurl = result.secure_url;

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

    forgotPassword: async (req, res) => {
        try {
            const { cccd, email } = req.body;
            const user = await UserProfile.findOne({ cccd, email });
            if (user) {
                const token = jwt.sign({ cccd, email }, process.env.JWT_SECRET, { expiresIn: '30m' });
                // Tạo URL đến trang đổi mật khẩu trong email
                const resetPasswordURL = `http://localhost:3000/reset-password?token=${token}`;
                // Send reset password email
                const emailResponse = await sendMail(user, resetPasswordURL);
                console.log('Email response:', emailResponse);
                return res.status(200).json({
                    token,
                    message: 'Chúng tôi đã gửi một hộp thư thay đổi mật khẩu đến địa chỉ email mà bạn đã đăng ký. Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn để hoàn tất quá trình thay đổi mật khẩu. '
                });

            }
            else return res.status(500).json({ message: " Không tìm thấy thông tin nào phù hợp" });

        } catch (error) {
            return res.status(500).json({ error });
        }
    },


    getAllEventByUser: async (req, res) => {
        try {
            const allEvent = await Event.find({ status: "1" });
            const eventCount = allEvent.length;
            return res.status(200).json({ count: eventCount, allEvent });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    

    tobeHospital: async (req, res) => {
        try {
            //async function
            const validationResult = await validateHospital(req.body);
            //validate đúng thì tạo hospitalProfile mới
            // và tạo account mới chưa có password
            if (validationResult.isValid) {
                console.log('cccd:', req.body.sdd);
                console.log('email:', req.body.sdd);
                const newAccount = new Account({
                    cccd: req.body.sdd,
                    email: req.body.email,
                    isHospital: true,
                });
                const account = await newAccount.save();
                const account_id = account.id;
                console.log("new account_id", account_id);
                const newHospitalProfile = new HospitalProfile({
                    // account_id: account_id,
                    cccd: req.body.sdd,
                    hospitalName: req.body.hospitalName,
                    phone: req.body.phone,
                    address: req.body.address,
                    leaderName: req.body.leaderName,
                    email: req.body.email,
                   
                });

                const hospitalProfile = await newHospitalProfile.save();
                console.log(hospitalProfile)
                return res.status(200).json({account,hospitalProfile});
            } else {
                return res.status(400).json({ message: validationResult.message });
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
// >>>>>>> Stashed changes

};

async function validateHospital(body) {
    const { sdd, address, phone, leaderName, hospitalName, email } = body;

    try {
        // tồn tại sdd
        const existingSdd = await Account.findOne({ sdd });
        if (existingSdd) {
            return { message: 'Số định danh đã tồn tại' };
        }
        //tồn tại email
        const existingEmail = await Account.findOne({ email });
        if (existingEmail) {
            return { message: 'Email đã tồn tại' };
        }

        // Continue with other validations
        if (Validate.isEmpty(sdd)
            || Validate.isEmpty(email)
            || Validate.isEmpty(hospitalName)
            || Validate.isEmpty(address)
            || Validate.isEmpty(phone)
            || Validate.isEmpty(leaderName)) {
            return { message: 'Vui lòng điền vào các mục còn trống' };
        }

        if (!Validate.isNumeric(sdd)) {
            return { message: 'Số định danh phải là số' };
        }

        if (!Validate.isEmail(email)) {
            return { message: 'Email không đúng định dạng' };
        }

        return { isValid: true };
    } catch (error) {
        throw error;
    }
}

module.exports = userController;
