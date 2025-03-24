const bcrypt = require('bcrypt');
const User = require('../models/user');


// Input validation
const validatePassword = (password) => {
    const minLength = 8;
    const hasNumbers = /\d/;
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/;
    return password.length >= minLength && hasNumbers.test(password) && hasSpecialChars.test(password);
} 

// Register Account
exports.registerUser = async (req, res) => {
    const { username, password, contactInfo } = req.body;
    
    // Validate the password format
    if (!validatePassword(password)) {
        return res.status(400).send('Password does not meet the requirements.');
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(400).send('Username already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword,
            contactinfo: contactInfo,
            role: 'driver'
        });

        await user.save();

        return res.status(201).send('User registered successfully');
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Update account details
exports.updateUser = async (req, res) => {
    const { userID, newContactInfo } = req.body;

    if (!userID || !newContactInfo) {
        return res.status(400).send('User ID and new contact info are required');
    }

    const contactInfoIsValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newContactInfo);
    if (!contactInfoIsValid) {
        return res.status(400).send('Invalid contact info format');
    }

    try {
        const user = await User.findByIdAndUpdate(
            userID,
            { contactInfo: newContactInfo },
            { new: true } // Return updated document
        );

        if (!user) {
            return res.status(404).send('User not found');
        }

        return res.status(200).send('Profile updated successfully');
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Render sign up page
exports.renderSignupPage = (req, res) => {
    const signupContent = {
      title: "ParkName",
      siteName: "ParkName",
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
      login: "Login",
      signUp: "Sign Up",
      footerText: "2025 Simple starter website"
    };
      res.render('signup', signupContent);
};
