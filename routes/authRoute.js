const express = require('express');
const router = express();

const authController = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../helper/validator');
const auth = require('../middlewares/authMiddleware');

router.post('/register', registerValidator, authController.registerUser);
router.post('/login', registerValidator, authController.loginUser);

router.get('/profile', auth, authController.getProfile);

module.exports = router;