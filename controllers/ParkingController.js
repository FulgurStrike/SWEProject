const express = require('express');
const router = express.Router();
const ParkingLot = require('../models/parkinglot');
const ParkingSpace = require('../models/parkingspace');
const ParkingRequest = require('../models/parkingrequest');
const parkinglot = require('../models/parkinglot');
// Assign parking space to the request
router.post('/assign', async (req, res) => {
    const { requestID, spaceID } = req.body;

    try {
        const parkingRequest = await ParkingRequest.findById(requestID).populate('driver');
        const parkingSpace = await ParkingSpace.findById(spaceID);

        if (!parkingRequest || !parkingSpace) {
            req.flash('error', 'Parking request or space not found');
            return res.redirect('back');
        }

        // Check if parking space is available
        if (parkingSpace.isOccupied || parkingSpace.isReserved) {
            req.flash('error', 'Parking space is already taken');
            return res.redirect('back');
        }

        parkingRequest.parkingSpace = parkingSpace._id;
        parkingRequest.requestStatus = 'approved';
        await parkingRequest.save();

        // Update parking space status
        parkingSpace.isOccupied = true;
        await parkingSpace.save();

        req.flash('success', 'Parking space succesfully assigned!');
        return res.redirect('back');
    } catch (err) {
        req.flash('error', 'Server error, please try later');
        return res.redirect('back');
    }
});

// Release parking space
router.post('/release', async (req, res) => {
    const {spaceID} = req.body;

    try {
        const parkingSpace = await ParkingSpace.findById(spaceID);
        if (!parkingSpace) {
            req.flash('error', 'Parking space not found');
            return res.redirect('back');
        }

        if (!parkingSpace.isOccupied) {
            req.flash('success', 'Parking space is not occupied');
            return res.redirect('back');
        }

        parkingSpace.isOccupied = false;
        parkingSpace.isReserved = false;
        await parkingSpace.save();
        req.flash('success', 'parking space released');
        return res.redirect('back');
    } catch (err) {
        req.flash('error', 'Server error occured when releasing');
        return res.redirect('back');
    }
});

// Add parking space to lot
router.post('/add', async (req, res) => {
    const { parkingLotID, spaceID } = req.body;

    try {
        const parkingLot = await ParkingLot.findById(parkingLotID);
        const parkingSpace = await ParkingSpace.findById(spaceID);

        if (!parkingLot || !parkingSpace) {
            req.flash('error', 'parking lot or space not found');
            return res.redirect('back');
        }

        if (parkingLot.parkingSpaces.includes(parkingSpace._id)) {
            req.flash('error', 'already added to this lot');
            return res.redirect('back');
        }

        parkingLot.parkingSpaces.push(parkingSpace._id);
        await parkingLot.save();
        req.flash('success', 'added to the lot');
        return res.redirect('back');
    } catch (err) {
        req.flash('error', 'Server error when adding to lot');
        return res.redirect('back');
    }
});

// Remove parking space from the lot
router.post('/remove', async (req, res) => {
    const { parkingLotID, spaceID } = req.body;

    try {
        const parkingLot = await ParkingLot.findById(parkingLotID);
        if (!parkingLot) {
            req.flash('error', 'parking lot not found');
            return res.redirect('back');
        }

        // Check if space exists in parkingSpaces[] array in parking lot model
        const spaceIndex = parkingLot.parkingSpaces.indexOf(spaceID);
        if (spaceIndex === -1) {
            req.flash('error', 'parking space not found in lot');
            return res.redirect('back');
        }

        // Remove space from parking lot
        parkingLot.parkingSpaces.splice(spaceIndex, 1);
        await parkingLot.save();
        
        req.flash('success', 'parking space removed from lot');
        return res.redirect('back');
    } catch (err) {
        req.flash('error', 'Server error when removing space from lot');
        return res.redirect('back');
    }
});

// Get available parking spaces
router.get('/available', async (req, res) => {
    try {
        const availableSpaces = await ParkingSpace.find({ isOccupied: false, isReserved: false });
        req.flash('success', availableSpaces);
        return res.redirect('back');
    } catch (err) {
        req.flash('error', err.message);
        return res.redirect('back');
    }
});

// Get parking lot details
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const parkingLot = await ParkingLot.findById(id).populate('parkingSpaces');
        if (!parkingLot) {
            req.flash('error', 'Parking lot not found');
        return res.redirect('back');
        
        }
        req.flash('success', parkinglot);
        return res.redirect('back');
    } catch (err) {
        req.flash('error', err.message);
    return res.redirect('back');
    }
})

module.exports = router;