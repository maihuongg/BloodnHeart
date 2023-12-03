const router = require('express').Router();
const accountController = require('../controllers/accountController');
// const router= express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/auth')
//personal admin profile
router.get('/profile/:account_id',authMiddleware.isAdmin, adminController.getAdminById);
//get event
router.get('/event',authMiddleware.isAdmin, adminController.getAllEvent);
//get all user
router.get('/users', accountController.getAllAccount);
//get account by _id
router.get('/account/:id', adminController.getAccountById);

router.get('/profile/info/:id', adminController.getInfoByAccountId);

module.exports = router;