const router = require('express').Router();
// const router= express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth')
router.get('/profile/:account_id',authMiddleware.isUser, userController.getUserById);
router.put('/profile/:account_id',authMiddleware.isUser, userController.updateProfile);

module.exports = router;