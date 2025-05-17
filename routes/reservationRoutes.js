const express = require('express');
const router = express.Router();
const ParkingRequestController = require('../controllers/ParkingRequestController');
const { authenticateDriver } = require('../controllers/AuthenticationController');

router.get('/', ParkingRequestController.showReservationPage);
router.post('/reservation', authenticateDriver, ParkingRequestController.makeReservation);
router.get('/check-status', authenticateDriver, ParkingRequestController.checkRequestStatus);

//router.get('/requests', ParkingRequestController.viewUserParkingRequests);
//router.get('/request/:requestID', ParkingRequestController.viewParkingRequest);

module.exports = router;

