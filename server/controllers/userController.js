const UserProfile = require('../models/userProfileModel');

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
    }
    
};

module.exports = userController;
