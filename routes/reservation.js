const express = require('express');
const router = express.Router();

const ParkingRequest = require('../models/ParkingRequest');
const ParkingSpace = require('../models/parkingspace');


router.post('/assign/:requestId', async (req, res) => {
  try {
    const { requestId } = req.params;

    // this gets the request 
    const request = await ParkingRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: 'the Request is  not found' });

    const { arrivalTime, departureTime } = request;

    // this effectively checks all the requests that may overlap with this time window 
    const conflictingRequests = await ParkingRequest.find({
      _id: { $ne: requestId }, // doesn't include the current request
      assignedSpace: { $ne: null },
      $or: [
        { arrivalTime: { $lt: departureTime, $gte: arrivalTime } },
        { departureTime: { $gt: arrivalTime, $lte: departureTime } },
        {
          $and: [
            { arrivalTime: { $lte: arrivalTime } },
            { departureTime: { $gte: departureTime } }
          ]
        }
      ],
      requestStatus: { $in: ['assigned'] }
    });

    const takenSpaceIds = conflictingRequests.map(r => r.assignedSpace.toString());


    const availableSpace = await ParkingSpace.findOne({
      _id: { $nin: takenSpaceIds }, // finds an available space 
      isOccupied: false
    });

    if (!availableSpace) {
      return res.status(400).json({ message: 'No available spaces for the requested time.' });
    }

    // it then assigns that space and updates the database 
    request.assignedSpace = availableSpace._id;
    request.requestStatus = 'assigned';
    await request.save();

    return res.status(200).json({
      message: 'Parking space successfully assigned.',
      request
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while assigning space.' });
  }
});

module.exports = router;
