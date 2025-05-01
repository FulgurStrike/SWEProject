const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
  
// Login to account
exports.login = async (req, res) => {
    const { email, password } = req.body;

     if (!email || !password) {
         return res.send('Username and password required');
     }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            //return res.status(404).send('User not found');
            return res.send('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            //return res.status(400).send('Invalid credentials');
            return res.send('Invalid credentials');
        }
        // Create JWT token with user info
        // const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_TOKEN, { expiresIn: '5h' });
        
        // JWT Needs fixing. I am not sure how to do it - Aiden
        
        // Set JWT token into cookie
        // res.cookie('auth_token', token, {httpOnly: true, maxAge: 5 * 60 * 60 * 1000});

        return res.redirect('/');
    } catch (err) {
        console.error(err);
        return res.send(err.message);
    }
};

// Logout user
exports.logout = (req, res) => {
    res.clearCookie('auth_token');
    res.redirect('/login');
};

// Middleware to authenticate JWT token
exports.authenticateToken = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) return res.redirect('/login');

    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
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
      footerText: "2025 Simple starter website",
      invalidCredentials: ""
    }

    res.render('login', loginContent)
};
