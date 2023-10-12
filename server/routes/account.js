const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const userController = require('../controllers/userController');
const accountController = require('../controllers/accountController');

// Admin get all user
router.get('/users/', authMiddleware.isAdmin, accountController.getAllAccount);
router.put('/users/:account_id',authMiddleware.isAdmin, userController.updateProfile);

module.exports = router;
