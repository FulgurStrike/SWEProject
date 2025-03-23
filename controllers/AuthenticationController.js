const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Login to account
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret_key', { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;