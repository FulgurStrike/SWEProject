const express = require('express');
const router = express.Router();
const ParkingRequest = require('../models/parkingrequest');

// Approve parking request
router.post('/approve', async (req, res) => {
    const { adminID, parkingRequestID } = req.body;

    try {
        const parkingRequest = await ParkingRequest.findById(parkingRequestID).populate('driver');
        if (!parkingRequest) {
            return res.status(404).send('Parking request not found');
        }

        parkingRequest.requeststatus = 'approved';
        await parkingRequest.save();

        return res.status(200).send('Parking request approved');
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// Reject parking request
router.post('/reject', async (req, res) => {
    const { adminID, parkingRequestID } = req.body;

    try {
        const parkingRequest = await ParkingRequest.findById(parkingRequestID);
        if (!parkingRequest) {
            return res.status(404).send('Parking request not found');
        }

        parkingRequest.requeststatus = 'rejected';
        await parkingRequest.save();

        return res.status(200).send('Parking request rejected');
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;
