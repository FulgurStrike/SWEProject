const Payment = require('../models/payment');
const ParkingRequest = require('../models/parkingrequest');

const rate_per_hour = 2;
const rate_per_minute = rate_per_hour / 60;

function calculatePayment(arrival, departure) {
    const duration = Math.ceil((departure - arrival) / 60000); // in minutes
    const amount = duration * rate_per_minute;
    return { duration, amount };
}

// Make payment
exports.makePayment = async (req, res) => {
    const parkingRequestID = req.cookies.requestID;
    console.log(parkingRequestID);

    try {
        const parkingRequest = await ParkingRequest.findById(parkingRequestID);
        if (!parkingRequestID) {
            req.flash('error', 'Parking request not found');
            return res.redirect('back');
        }
        const arrival = new Date(parkingRequest.arrivalTime);
        const departure = new Date(parkingRequest.departureTime);
        const { duration, amount } = calculatePayment(arrival, departure);

        const payment = new Payment({
            parkingRequest: parkingRequestID,
            amount,
            paymentStatus: 'completed',
            paymentDate: Date.now(),
        });

        await payment.save();

        return res.render('paymentConfirmation', {
            
          title: "UEA Park",
          siteName: "UEA Park",
          home: "Home",
          help: "Help",
          login: "Login",
          signUp: "Sign Up",
          logout: "Logout",
          footerText: "2025 UEA Software Engineering Group 111",
          amount: amount.toFixed(2),
          duration,
          arrivalTime: arrival.toLocaleString(),
          departureTime: departure.toLocaleString(),
          title: 'Payment Successful',
          message: 'Your payment was successfully processed!',
          parkingRequestID: parkingRequestID,
          amount: amount.toFixed(2),
          paymentStatus: payment.paymentStatus
        });
    } catch (err) {
        console.error(err);
        req.flash('error', err.message);
            return res.redirect('back');
    }
};


exports.renderPaymentPage = async (req, res) => {
   const parkingRequestID = req.cookies.requestID;
   const parkingRequest = await ParkingRequest.findById(parkingRequestID);
   if (!parkingRequestID) {
     req.flash('error', 'Parking request not found');
            return res.redirect('back');
   }
  
   const arrival = new Date(parkingRequest.arrivalTime);
   const departure = new Date(parkingRequest.departureTime);
   const { duration, amount } = calculatePayment(arrival, departure);

    const paymentContent = {
        title: "UEA Park",
        siteName: "UEA Park",
        home: "Home",
        help: "Help",
        login: "Login",
        signUp: "Sign Up",
        logout: "Logout",
        footerText: "2025 UEA Software Engineering Group 111",
        amount: amount.toFixed(2),
        duration,
        arrivalTime: arrival.toLocaleString(),
        departureTime: departure.toLocaleString(),
        requestId: parkingRequestID
    };
    res.render('payment', paymentContent)
};
