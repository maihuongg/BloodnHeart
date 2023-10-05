const Account = require('../models/accountModel');

const accountController = {
    getAllAccount: async (req, res) => {
        try {
            const allAccount = await Account.find();
            return res.status(200).json(allAccount);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
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