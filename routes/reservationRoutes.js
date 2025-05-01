const express = require('express');
const router = express.Router();
const ParkingRequestController = require('../controllers/ParkingRequestController');

router.get('/', ParkingRequestController.showReservationPage);
router.post('/reservation', ParkingRequestController.makeReservation);
router.get('/requests', ParkingRequestController.viewUserParkingRequests);
router.get('/request/:requestID', ParkingRequestController.viewParkingRequest);

module.exports = router;

