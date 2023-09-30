const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Validate = require('validator');
const authController = {
    // register
    registerUser: async (req, res) => {
        try {
            //async function
            const validationResult = await validateRegister(req.body);
            //validate đúng thì tạo user mới
            if (validationResult.isValid) {
                //bcrypt
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(req.body.password, salt);

                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashed,
                });

                const user = await newUser.save();
                res.status(200).json(user);
            } else {
                res.status(400).json({ message: validationResult.message });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
};
//hàm validate Register
async function validateRegister(body) {
    const { username, password, email } = body;

    try {
       // tồn tại username
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return { message: 'Username đã tồn tại' };
        }
        //tồn tại email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return { message: 'Email đã tồn tại' };
        }

        // Continue with other validations
        if (Validate.isEmpty(username)) {
            return { message: 'CCCD không được để trống' };
        }

        if (!Validate.isNumeric(username)) {
            return { message: 'CCCD phải là số' };
        }

        if (Validate.isEmpty(email)) {
            return { message: 'Email không được để trống' };
        }

        if (!Validate.isEmail(email)) {
            return { message: 'Email không đúng định dạng' };
        }

        if (Validate.isEmpty(password)) {
            return { message: 'Password không được để trống' };
        }

        return { isValid: true };
    } catch (error) {
        throw error;
    }
}

module.exports = authController;
