const express = require('express');
const router = express.Router();
const AuthenticationController = require('../controllers/AuthenticationController');

router.get('/', AuthenticationController.renderLoginPage);
router.post('/login', AuthenticationController.login);
module.exports = router;