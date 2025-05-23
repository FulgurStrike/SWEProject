const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/userDashboard', UserController.renderUserDashboard);

module.exports = router;