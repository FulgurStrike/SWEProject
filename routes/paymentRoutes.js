const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');

router.get('/payment', paymentController.renderPaymentPage);
router.post('/payment/make', paymentController.makePayment);
router.post('/payment/process', paymentController.processPayment);

module.exports = router;