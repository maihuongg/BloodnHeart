const router = require('express').Router();
// const router= express.Router();
const hospitalController = require('../controllers/hospitalController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth')

router.get('/profile/:account_id',authMiddleware.isHospital, hospitalController.getHospitalById);
router.get('/event/:hospital_id',authMiddleware.isHospital, hospitalController.getEventByHospital);
<<<<<<< Updated upstream
router.post('/event/add', hospitalController.addEvent);
router.get('/detail/:id', hospitalController.getEventById);
router.put('/close/:id', hospitalController.closeEvent);
=======
router.post('/be-hospital', userController.tobeHospital);

>>>>>>> Stashed changes

module.exports = router;