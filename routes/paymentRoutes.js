const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');

router.get('/payment', PaymentController.renderPaymentPage);
router.post('/payment/make', PaymentController.makePayment);
// router.post('/payment/process', PaymentController.processPayment);

module.exports = router;
