const Account = require('../models/accountModel');

const accountController = {
    //========ROLE = ADMIN
    // ===== API for user
    getAllAccount: async (req, res) => {
        try {
            const allAccount = await Account.find();
            return res.status(200).json(allAccount);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    // updateUserProfile dùng lại hàm updateProfile ở phía user
    
};

module.exports = accountController;

// async function getAllAccount(req,res){
//     try {
//         const allAccount = await Account.find();
//         return res.status(200).json(allAccount);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// }