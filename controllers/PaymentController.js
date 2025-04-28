const Payment = require('../models/payment');

// Make payment
exports.makePayment = async (req, res) => {
    const { parkingRequestID, amount } = req.body;

    if (!parkingRequestID || !amount) {
        return res.status(400).send('Missing required payment information');
    }

    try {
        const payment = new Payment({
            parkingRequest: parkingRequestID,
            amount: amount,
            paymentStatus: 'pending',
            paymentDate: Date.now(),
        });

        await payment.save();
        // Simulate payment status change
        const paymentSuccess = simulatePayment();
        if (paymentSuccess) {
            payment.paymentStatus = 'completed';
        } else {
            payment.paymentStatus = 'failed';
        }

        await payment.save();

        return res.status(201).json(payment);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

const simulatePayment = () => {
    return Math.random() > 0.5;
}


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