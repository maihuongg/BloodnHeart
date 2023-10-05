const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const accountController = require('../controllers/accountController');

// Admin get all user
router.get('/users', authMiddleware.isAdmin, accountController.getAllAccount);

module.exports = router;
