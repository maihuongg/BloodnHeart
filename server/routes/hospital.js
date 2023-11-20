const router = require('express').Router();
// const router= express.Router();
const hospitalController = require('../controllers/hospitalController');
const authMiddleware = require('../middlewares/auth')

router.get('/profile/:account_id',authMiddleware.isHospital, hospitalController.getHospitalById);
router.get('/event/:hospital_id',authMiddleware.isHospital, hospitalController.getEventByHospital);

module.exports = router;