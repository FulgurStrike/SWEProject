const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    const { username, email, password, role } = req.body;
    
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


// Login to account
exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password required');
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            //return res.status(404).send('User not found');
            return res.status(401).send('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            //return res.status(400).send('Invalid credentials');
            return res.status(401).send('Invalid credentials');
        }
        // Create JWT token with user info
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_TOKEN, { expiresIn: '5h' });

        // Set JWT token into cookie
        res.cookie('auth_token', token, {httpOnly: true, maxAge: 5 * 60 * 60 * 1000});

        return res.redirect('/');
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

exports.showLoginPage = (req, res) => {
    const loginContent = {
      title: "ParkName",
      siteName: "ParkName",
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
      login: "Login",
      signUp: "Sign Up",
      footerText: "2025 Simple starter website"
    }

    res.render('login', loginContent)
};
