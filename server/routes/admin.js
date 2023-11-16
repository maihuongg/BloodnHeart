const router = require('express').Router();
const accountController = require('../controllers/accountController');
// const router= express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/auth')

router.get('/profile/:account_id',authMiddleware.isAdmin, adminController.getAdminById);
//get user
router.get('/users', authMiddleware.isAdmin, accountController.getAllAccount);

module.exports = router;