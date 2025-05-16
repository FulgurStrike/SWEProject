const express = require('express');
const router = express.Router();
const ParkingRequestController = require('../controllers/ParkingRequestController');
const { authenticateToken } = require('../controllers/AuthenticationController');

router.get('/reservation', ParkingRequestController.showReservationPage);
router.post('/reservation', authenticateToken, ParkingRequestController.makeReservation);
router.get('/check-status', ParkingRequestController.checkRequestStatus);
//router.get('/requests', ParkingRequestController.viewUserParkingRequests);
//router.get('/request/:requestID', ParkingRequestController.viewParkingRequest);

module.exports = router;

