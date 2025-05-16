const DriverUser = require('../models/driveruser');
const ParkingRequest = require("../models/parkingrequest");
const ParkingLot = require("../models/parkinglot");

const indexContent = {
    title: "ParkName",
    siteName: "ParkName",
    home: "Home",
    help: "Help",
    login: "Login",
    signUp: "Sign Up",
    logout: "Logout",
    footerText: "2025 UEA Software Engineering Group 111",
    heroHeader: "Welcome to our Website",
    errorMessage: "",
  }


String.prototype.toObjectId = function() {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};

// Create parking request
exports.makeReservation = async (req, res) => {
    const { parkingLotName, arrivalTime, departureTime, registration } = req.body;

    const arr = new Date(arrivalTime);
    const dep = new Date(departureTime);

    if(arr > dep){
        console.log("timing error : ", arr , " and :", dep);
        indexContent.errorMessage = "Arrival time after departure time."
        res.render('reservation', indexContent);
        indexContent.errorMessage = "";
    } else {

      console.log(parkingLotName, arrivalTime, departureTime, registration);


      driverID = req.cookies.user_id;

      parkingLot = await ParkingLot.findOne({ "lotName": parkingLotName });

      driver = await DriverUser.findById(driverID).exec();

      try {
        const parkingRequest = new ParkingRequest({
          driver: driver,
          parkingLot: parkingLot,
          arrivalTime: arrivalTime,
          departureTime: departureTime

        });
        await parkingRequest.save();

        res.cookie("requestID", parkingRequest._id.toString(), {httpOnly: true, maxAge: 15 * 60 * 1000}); // 15 minutes

        res.redirect(`/payment`);  

        //res.render('viewParkingRequests')
      } catch (err) {
        req.flash('error', err.message);
        return res.redirect('back');

      }
    }
}

// View all parking requests
exports.viewUserParkingRequests = async (req, res) => {
    const driverID = req.user._id;

    try {
        // Find all requests associated with logged-in user
        const parkingRequests = await ParkingRequest.find({driver: driverID})
            .populate('parkingSpace')
            .populate('driver');
        res.render('viewParkingRequests', { parkingRequests });
    } catch (error) {
        req.flash('error',err.message);
            return res.redirect('back');
    }
}

// View parking request details
exports.viewParkingRequest = async (req, res) => {
    const { requestID } = req.params;

    try {
        const parkingRequest = await ParkingRequest.findById(requestID)
            .populate('parkingSpace')
            .populate('driver');
        if (!parkingRequest) {
            req.flash('error', 'Parking request not found');
            return res.redirect('back');
        }

        res.render('viewParkingRequest', {parkingRequest});
    } catch (err) {
        req.flash('error', err.message);
            return res.redirect('back');
    }
};

exports.showReservationPage = (req, res) => {
    
    res.render('reservation', indexContent);
};

