const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

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
};
  
// Login to account
exports.login = async (req, res) => {
    const { email, password } = req.body;

     if (!email || !password) {
        return res.send('Username and password required');
     }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            loginContent.invalidCredentials = "Wrong username or Password";
            res.render("login", loginContent);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            loginContent.invalidCredentials = "Wrong Username or Password";
            res.render("login", loginContent);
        }
        // Create JWT token with user info
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_TOKEN, { expiresIn: '5h' });       
        
        // Set JWT token into cookie
        const userID = User.get("_id").toString();
        console.log(userID);
        res.cookie('auth_token', token, {httpOnly: true, maxAge: 5 * 60 * 60 * 1000});
        res.cookie('user_id', userID);

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
    

    res.render('login', loginContent)
};

