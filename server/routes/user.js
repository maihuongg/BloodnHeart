const router = require('express').Router();
const accountController = require('../controllers/accountController');
// const router= express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth')
router.get('/profile/:account_id',authMiddleware.isUser, userController.getUserById);
router.put('/profile/:account_id',authMiddleware.isUser, userController.updateProfile);
router.put('/profileimage/:account_id',authMiddleware.isUser, userController.updateProfileImage);
router.post('/forgot-password',userController.forgotPassword);
router.post('/valid-reset-token',authMiddleware.checkValidResetPasswordToken);
router.put('/reset-password', authMiddleware.verifyResetPasswordToken,accountController.resetPassword);
router.get('/event', userController.getAllEventByUser);

module.exports = router;