const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const AdminUser = require('../models/adminuser');

// Middleware to check if the user is an admin
async function isAdmin(req, res, next) {
    try {
        const adminUser = await AdminUser.findById(req.user.id);
        if (!adminUser) {
            return res.status(403).send('Unauthorized: Admin access required');
        }
        next();
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

router.get('/user/:userID/requests', isAdmin, AdminController.viewUserParkingRequests);

router.get('/adminDashboard', AdminController.renderAdminPage);

router.post('/approve', isAdmin, AdminController.approveParkingRequest);

router.post('/reject', isAdmin, AdminController.rejectParkingRequest);

module.exports = router;