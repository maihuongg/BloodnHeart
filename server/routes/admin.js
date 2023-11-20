const router = require('express').Router();
const accountController = require('../controllers/accountController');
// const router= express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/auth')

router.get('/profile/:account_id',authMiddleware.isAdmin, adminController.getAdminById);
//get event
router.get('/event',authMiddleware.isAdmin, adminController.getAllEvent);
//get user
router.get('/users', accountController.getAllAccount);

module.exports = router;