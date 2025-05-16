const ParkingRequest = require('../models/parkingrequest');
const User = require('../models/user');
const ParkingLot = require('../models/parkinglot');
const DriverUser = require("../models/driveruser");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Approve parking request
exports.approveParkingRequest = async (req, res) => {
    const parkingRequestID = req.body.id;

    try {
        const parkingRequest = await ParkingRequest.findById(parkingRequestID).populate('driver');
        if (!parkingRequest) {
            req.flash('error', 'Parking request not found');
            return res.redirect('back');
        }


        const parkingLot = await ParkingLot.findById(parkingRequest.parkingLot._id.toString());
        parkingLot.availableSpaces -= 1;
        await parkingLot.save();

        parkingRequest.requestStatus = 'approved';
        await parkingRequest.save();  

        req.flash('message', 'Parking request approved');
        return res.redirect('back');

    } catch (err) {
        return res.status(500).send(err.message);
    }
};

// Reject parking request
exports.rejectParkingRequest = async (req, res) => {
    const parkingRequestID = req.body.id;

    try {
        const parkingRequest = await ParkingRequest.findById(parkingRequestID);
        if (!parkingRequest) {
            return res.status(404).send('Parking request not found');
        }

        parkingRequest.requestStatus = 'rejected';
        await parkingRequest.save();

        req.flash('message', 'Parking request rejected');
        return res.redirect('back');

    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const Message = require('../models/messages');

const loginContent = {
      title: "ParkName",
      siteName: "ParkName",
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Help",
      login: "Login",
      signUp: "Sign Up",
      footerText: "2025 Simple starter website",
      invalidCredentials: ""
    };

exports.renderAdminLogin = (req, res) => {   
    res.render('adminlogin', loginContent);
};



exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

     if (!email || !password) {
        return res.send('Username and password required');
     }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            loginContent.invalidCredentials = "Wrong username or Password";
            res.render("adminlogin", loginContent);
        }
        else{
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            loginContent.invalidCredentials = "Wrong Username or Password";
            res.render("adminLogin", loginContent);
        }
      
        // Create JWT token with user info
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_TOKEN, { expiresIn: '5h' });       
        
        // Set JWT token into cookie
        const userID = user._id.toString();
        console.log(userID);
        res.cookie('auth_token', token, {httpOnly: true, maxAge: 5 * 60 * 60 * 1000});
        res.cookie('user_id', userID);

        return res.redirect('/adminDashboard');
      }
    } catch (err) {
        console.error(err);
        return res.send(err.message);
    }
};

exports.freeSpace = async (req, res) => {
  const approvedRequestId = req.body.id;

  console.log(approvedRequestId);

  const approvedRequest = await ParkingRequest.findById(approvedRequestId);
  const parkingLot = await ParkingLot.findById(approvedRequest.parkingLot._id);
  parkingLot.availableSpaces += 1;
  await parkingLot.save();

  await ParkingRequest.findByIdAndDelete(approvedRequestId);

  res.redirect("/adminDashboard");

};

exports.banUser = async (req, res) => {
  const userId = req.body.id;

  const user = await User.findByIdAndDelete(userId);

  res.redirect("/adminDashboard");
}


exports.renderAdminPage = async (req, res) => {

    const userID = req.cookies.user_id;
    const user = await User.findById(userID).exec();

    if (user === null || user.__t != "AdminUser") {
      res.redirect("/adminDashboard/login");
    } else {
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
          .populate('driver')
          .populate('parkingLot');
        const parkingLots = await ParkingLot.find({});
        const drivers = await DriverUser.find({}); 

        res.render('adminDashboard', { ...adminContent, messages, requests, parkingLots, drivers });
      } catch (err) {
        console.error('Failed to fetch messages:', err);
        res.render('adminDashboard', { ...adminContent, messages: [], requests: [], parkingLots: [], drivers: [] });      
      }
    }

};
