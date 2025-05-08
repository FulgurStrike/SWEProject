const ParkingRequest = require('../models/parkingrequest');

// View parking requests for a user
exports.viewUserParkingRequests = async (req, res) => {
    const {userID} = req.params;

    try {
        const parkingRequests = await ParkingRequest.find({driver: userID})
            .populate('parkingSpace')
            .populate('driver');
        if (parkingRequests.length === 0) {
            return res.status(404).send('No parking requests found for this user');
        }
        res.render('adminDashboard/viewUserParkingRequests', {parkingRequests, userID});
    } catch (error) {
        return res.status(500).send(err.message);
    }
}

// Approve parking request
exports.approveParkingRequest = async (req, res) => {
    const { parkingRequestID } = req.body;

    try {
        const parkingRequest = await ParkingRequest.findById(parkingRequestID).populate('driver');
        if (!parkingRequest) {
            return res.status(404).send('Parking request not found');
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

