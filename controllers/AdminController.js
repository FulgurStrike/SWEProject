const ParkingRequest = require('../models/parkingrequest');


// Approve parking request
exports.approveParkingRequest = async (req, res) => {
    const { parkingRequestID } = req.body;

    try {
        const parkingRequest = await ParkingRequest.findById(parkingRequestID).populate('driver');
        if (!parkingRequest) {
            req.flash('error', 'Parking request not found');
            return res.redirect('back');
        }
        parkingRequest.requestStatus = 'approved';
        await parkingRequest.save();

        return res.status(200).send('Parking request approved');
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

// Reject parking request
exports.rejectParkingRequest = async (req, res) => {
    const { parkingRequestID } = req.body;

    try {
        const parkingRequest = await ParkingRequest.findById(parkingRequestID);
        if (!parkingRequest) {
            return res.status(404).send('Parking request not found');
        }

        parkingRequest.requestStatus = 'rejected';
        await parkingRequest.save();

        return res.status(200).send('Parking request rejected');
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const Message = require('../models/messages');


exports.renderAdminPage = async (req, res) => {
    const adminContent = {
      title: "ParkName",
      siteName: "ParkName",
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Help",
      login: "Login",
      signUp: "Sign Up",
      footerText: "2025 Parkname Management System"
    };
    try {
        const messages = await Message.find({});
        const requests = await ParkingRequest.find({})
            .populate('parkingSpace')
            .populate('driver');

        res.render('adminDashboard', { ...adminContent, messages, requests });
      } catch (err) {
        console.error('Failed to fetch messages:', err);
        res.render('adminDashboard', { ...adminContent, messages: [], requests: [] });      }
};
