const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');

router.get('/payment', PaymentController.renderPaymentPage);
router.post('/confirm-payment', PaymentController.makePayment);

module.exports = router;
