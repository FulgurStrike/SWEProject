const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');

// Make payment
router.post('/make', async (req, res) => {
    const { driverID, amount, paymentMethod } = req.body;

    try {
        const payment = new Payment({
            driver: driverID,
            amount,
            paymentMethod,
            paymentStatus: 'pending',
        });

        await payment.save();

        return res.status(201).json(payment);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// Process payment
router.post('/process', async (req, res) => {
    const { paymentID } = req.body;

    try {
        const payment = await Payment.findById(paymentID);
        if (!payment) {
            return res.status(404).send('Payment not found');
        }

        // Simulate payment processing
        payment.paymentStatus = 'completed';
        await payment.save();

        return res.status(200).send('Payment processed');
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;
