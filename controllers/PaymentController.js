const Payment = require('../models/payment');

// Make payment
exports.makePayment = async (req, res) => {
    const { driverID, amount, paymentMethod } = req.body;

    if (!driverID || !amount || !paymentMethod) {
        return res.status(400).send('Missing required payment information');
    }

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
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Process payment
exports.processPayment = async (req, res) => {
    const { paymentID } = req.body;

    if (!paymentID) {
        return res.status(400).send('Payment ID is required');
    }

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
        console.error(err);
        return res.status(500).send(err.message);
    }
};

exports.renderPaymentPage = (req, res) => {
    const paymentContent = {
      title: "ParkName",
      siteName: "ParkName",
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
      login: "Login",
      signUp: "Sign Up",
      footerText: "2025 Simple starter website"
    };
    res.render('payment', paymentContent)
};