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

router.get('/adminDashboard/login', AdminController.renderAdminLogin);

router.post('/adminDashboard/login', AdminController.adminLogin);

router.get('/adminDashboard', AdminController.renderAdminPage);

router.post('/adminDashboard/accept', AdminController.approveParkingRequest);

router.post('/adminDashboard/reject', AdminController.rejectParkingRequest);

router.post('/adminDashboard/freeSpace', AdminController.freeSpace);

router.post('/adminDashboard/banUser', AdminController.banUser);

router.post('/adminDashboard/sendMessage', AdminController.sendMessage);

module.exports = router;
