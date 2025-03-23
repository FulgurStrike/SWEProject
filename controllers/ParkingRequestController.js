const express = require('express');
const router = express.Router();
const ParkingRequest = require('../models/parkingrequest');
const ParkingSpace = require('../models/parkingspace');

// Create parking request
router.post('/create', async (req, res) => {
    const { driverID, destination, arrivaltime, departuretime } = req.body;

    try {
        const parkingRequest = new ParkingRequest({
            driver: driverID,
            destination,
            arrivaltime,
            departuretime,
        });
        await parkingRequest.save();

        return res.status(201).json(parkingRequest);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// View parking request details
router.get('/view/:requestID', async (req, res) => {
    const { requestID } = req.params;

    try {
        const parkingRequest = await ParkingRequest.findById(requestID).populate('assignedspace');
        if (!parkingRequest) {
            return res.status(404).send('Parking request not found');
        }

        return res.status(200).json(parkingRequest);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;
