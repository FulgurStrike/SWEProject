const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/AuthenticationController');

router.get('/login', authenticationController.renderLoginPage);
router.post('/login', authenticationController.login);
module.exports = router;