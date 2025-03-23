const express = require('express');
const router = express.router();
const ParkingLot = require('../models/parkinglot');
const ParkingSpace = require('../models/parkingspace');
const ParkingRequest = require('../models/parkingrequest');

router.post('/assign', async (req, res) => {
    const { requestID, spaceID } = req.body;

    try {
        const parkingRequest = await ParkingRequest.findByID(requestID).populate('driver');
        const parkingSpace = await ParkingSpace.findByID(spaceID);

        if (!parkingRequest || !parkingSpace) {
            return res.status(404).send('Parking request or space not found');
        }

        // Assign parking space to the request
        parkingRequest.assignedspace = parkingSpace._id;
        parkingRequest.requeststatus = 'approved';
        await parkingRequest.save();

        // Update parking space status
        parkingSpace.isOccupied = true;
        await parkingSpace.save();
        return res.status(200).send('Parking space assigned');
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.post('/release', async (req, res) => {
    const {spaceID} = req.body;

    try {
        const parkingSpace = await ParkingSpace.findByID(spaceID);
        if (!parkingSpace) {
            return res.status(404).send("Parking space not found");
        }

        // Release parking space
        parkingSpace.isOccupied = false;
        await parkingSpace.save();
        return res.status(200).send('Parking space released');
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.post('/update', async (req, res) => {
    const { spaceID, status } = req.body;
    
    try {
        const parkingSpace = await ParkingSpace.findByID(spaceID);

        if (!parkingSpace) {
            return res.status(404).send('Parking space not found');
        }

        // Update parking space status
        parkingSpace.isOccupied = status === 'occupied';
        await parkingSpace.save();
        return res.status(200).send('Parking space updated');
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.post('/add', async (req, res) => {
    const { parkingLotID, spaceID } = req.body;

    try {
        const parkingLot = await ParkingLot.findByID(parkingLotID);
        const parkingSpace = await ParkingSpace.findByID(spaceID);

        if (!parkingLot || !parkingSpace) {
            return res.status(404).send('Parking lot or space not found');
        }

        parkingLot.parkingSpaces.push(parkingSpace._id);
        await parkingLot.save();
        return res.status(200).send('Parking space added to lot');
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.post('/remove', async (req, res) => {
    const { parkingLotID, spaceID } = req.body;

    try {
        const parkingLot = await ParkingLot.findByID(parkingLotID);
        if (!parkingLot) {
            return res.status(404).send('Parking lot not found');
        }

        // Remove parking space from the lot
        parkingLot.parkingSpaces.filter(spaceID => spaceID.toString() !== spaceID);
        await parkingLot.save();
        return res.status(200).send('Parking space removed from lot');
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.get('/available', async (req, res) => {
    try {
        const availableSpaces = await ParkingSpace.find({ isOccupied: false, isReserved: false });
        return res.status(200).json(availableSpaces);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;