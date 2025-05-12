const express = require('express');
const router = express.Router();
const HelpController = require('../controllers/HelpController');

router.get('/help', HelpController.renderHelpPage);
router.post('/submit-contact', HelpController.submitContactForm);

module.exports = router;