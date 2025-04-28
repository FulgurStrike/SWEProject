const bcrypt = require('bcrypt');
const User = require('../models/user');
const driveruser = require('../models/driveruser');

// Input validation
const validatePassword = (password) => {
    const minLength = 8;
    const hasNumbers = /\d/;
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/;
    return password.length >= minLength && hasNumbers.test(password) && hasSpecialChars.test(password);
} 

// Register Account
exports.registerUser = async (req, res) => {
    const { email, password, role } = req.body;
    
    // Validate the password format
    if (!validatePassword(password)) {
        return res.status(400).send('Password does not meet the requirements.');
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role
        });
        await user.save();
        return res.status(201).send('User registered successfully');
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

exports.showUserProfile = async (req, res) => {
    const { userID } = req.user; // Assuming JWT middleware populates req.user
    try {
        const user = await User.findById(userID);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
// Update account details
exports.updateUser = async (req, res) => {
    const { userID } = req.user; // Assuming JWT middleware populates req.user
    const { username, email } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            userID,
            { username, email },
            { new: true } // Return updated document
        );
        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Render sign up page
exports.showSignupPage = (req, res) => {
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
