const ParkingRequest = require('../models/parkingrequest');
const DriverUser = require('../models/driveruser');


String.prototype.toObjectId = function() {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};

// Create parking request
exports.makeReservation = async (req, res) => {
    const { location, arrivalTime, departureTime, registration } = req.body;

    console.log(location, arrivalTime, departureTime, registration);

    console.log(req.cookies)
  

    driverID = req.cookies.user_id;
    console.log(driverID);

    

    driver = await DriverUser.findById(driverID).exec();
    console.log(driver.email);

    // if (!driverID || !arrivalTime || !departureTime) {
    //     return res.status(400).send('Missing required fields');
    // }

    try {
        const parkingRequest = new ParkingRequest({
            driver: driver,
            arrivalTime: arrivalTime,
            departureTime: departureTime,
        });
        await parkingRequest.save();

        const requestID = parkingRequest.get("_id");
        res.cookie("requestID", requestID);  

        //res.render('viewParkingRequests')
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

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
        return res.status(500).send(error.message);
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
            return res.status(404).send('Parking request not found');
        }

        res.render('viewParkingRequest', {parkingRequest});
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.showReservationPage = (req, res) => {
    const indexContent = {
      title: "ParkName",
      siteName: "ParkName",
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
      login: "Login",
      signUp: "Sign Up",
      heroHeader: "Welcome to our Website",

      footerText: "2025 Simple starter Website"
    }
    res.render('reservation', indexContent);
};

