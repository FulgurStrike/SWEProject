const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.get('/signup', userController.showSignupPage);
router.post('/signup', userController.registerUser);
router.post('/update', userController.updateUser);

module.exports = router;

