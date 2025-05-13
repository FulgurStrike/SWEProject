const express = require('express');
const router = express.Router();
const ParkingLot = require('../models/parkinglot');
const ParkingSpace = require('../models/parkingspace');
const ParkingRequest = require('../models/parkingrequest');

// Assign parking space to the request
router.post('/assign', async (req, res) => {
    const { requestID, spaceID } = req.body;

    try {
        const parkingRequest = await ParkingRequest.findById(requestID).populate('driver');
        const parkingSpace = await ParkingSpace.findById(spaceID);

        if (!parkingRequest || !parkingSpace) {
            return res.status(404).send('Parking request or space not found');
        }

        // Check if parking space is available
        if (parkingSpace.isOccupied || parkingSpace.isReserved) {
            return res.status(400).send('Parking space is already occupied or reserved');
        }

        parkingRequest.parkingSpace = parkingSpace._id;
        parkingRequest.requestStatus = 'approved';
        await parkingRequest.save();

        // Update parking space status
        parkingSpace.isOccupied = true;
        await parkingSpace.save();
        return res.status(200).send('Parking space assigned');
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// Release parking space
router.post('/release', async (req, res) => {
    const {spaceID} = req.body;

    try {
        const parkingSpace = await ParkingSpace.findById(spaceID);
        if (!parkingSpace) {
            return res.status(404).send("Parking space not found");
        }

        if (!parkingSpace.isOccupied) {
            return res.status(400).send('Parking space is not occupied')
        }

        parkingSpace.isOccupied = false;
        parkingSpace.isReserved = false;
        await parkingSpace.save();
        return res.status(200).send('Parking space released');
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// Add parking space to lot
router.post('/add', async (req, res) => {
    const { parkingLotID, spaceID } = req.body;

    try {
        const parkingLot = await ParkingLot.findById(parkingLotID);
        const parkingSpace = await ParkingSpace.findById(spaceID);

        if (!parkingLot || !parkingSpace) {
            return res.status(404).send('Parking lot or space not found');
        }

        if (parkingLot.parkingSpaces.includes(parkingSpace._id)) {
            return res.status(400).send('Parking space already added to lot');
        }

        parkingLot.parkingSpaces.push(parkingSpace._id);
        await parkingLot.save();
        return res.status(200).send('Parking space added to lot');
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// Remove parking space from the lot
router.post('/remove', async (req, res) => {
    const { parkingLotID, spaceID } = req.body;

    try {
        const parkingLot = await ParkingLot.findById(parkingLotID);
        if (!parkingLot) {
            return res.status(404).send('Parking lot not found');
        }

        // Check if space exists in parkingSpaces[] array in parking lot model
        const spaceIndex = parkingLot.parkingSpaces.indexOf(spaceID);
        if (spaceIndex === -1) {
            return res.status(404).send('Parking space not found in the parking lot');
        }

        // Remove space from parking lot
        parkingLot.parkingSpaces.splice(spaceIndex, 1);
        await parkingLot.save();
        
        return res.status(200).send('Parking space removed from lot');
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// Get available parking spaces
router.get('/available', async (req, res) => {
    try {
        const availableSpaces = await ParkingSpace.find({ isOccupied: false, isReserved: false });
        return res.status(200).json(availableSpaces);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// Get parking lot details
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const parkingLot = await ParkingLot.findById(id).populate('parkingSpaces');
        if (!parkingLot) {
            return res.status(404).send('Parking lot not found');
        
        }
        return res.status(200).json(parkingLot);
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

module.exports = router;