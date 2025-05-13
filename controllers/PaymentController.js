const Payment = require('../models/payment');

const rate_per_minute = 0.5;

// Make payment
exports.makePayment = async (req, res) => {
    const { amount } = req.body;

    parkingRequestID = req.cookies.requestID;
    console.log(parkingRequestID);

    if (!parkingRequestID || !amount) {
        return res.status(400).send('Missing required payment information');
    }

    try {
        const arrival = new Date(parkingRequest.arrivalTime);
        const departure = new Date(parkingRequest.departureTime);
        const duration = Math.ceil((departure - arrival) / 60000); // in minutes
        const amount = duration * rate_per_minute;

        const payment = new Payment({
            parkingRequest: parkingRequestID,
            amount: amount,
            paymentStatus: 'completed',
            paymentDate: Date.now(),
        });

        await payment.save();

        return res.render('paymentConfirmation', {
            title: 'Payment Successful',
            message: 'Your payment was successfully processed!',
            parkingRequestID: parkingRequestID,
            amount: amount.toFixed(2),
            paymentStatus: payment.paymentStatus
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};


exports.renderPaymentPage = async (req, res) => {
    const paymentContent = {
        title: "ParkName",           
        siteName: "ParkName",
        home: "Home",
        about: "About",
        services: "Services",
        contact: "Contact",
        login: "Login",
        signUp: "Sign Up",
        footerText: "2025 Simple starter website",
        amount: amount.toFixed(2),
        duration,
        arrivalTime: arrival.toLocaleString(),
        departureTime: departure.toLocaleString()
    };
    res.render('payment', paymentContent)
};
