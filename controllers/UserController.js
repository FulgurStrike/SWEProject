const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

// Register Account
router.post('/register', async (req, res) => {
    const { username, password, contactInfo } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, contactinfo: contactInfo, role: 'driver' });
        await user.save();
        return res.status(201).send('User registered successfully');
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// Update account details
router.post('/update', async (req, res) => {
    const { userID, newContactInfo } = req.body;

    try {
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.contactinfo = newContactInfo;
        await user.save();

        return res.status(200).send('Profile updated successfully');
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;