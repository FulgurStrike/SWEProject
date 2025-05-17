const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const driveruser = require('../models/driveruser');
require('dotenv').config()

if (!process.env.JWT_TOKEN /* or .JWT_SECRET */) {
    console.error("JWT_TOKEN is not defined in .env");
    process.exit(1);
  }
  

const loginContent = {
    title: "UEA Park",
    siteName: "UEA Park",
    home: "Home",
    help: "Help",
    login: "Login",
    signUp: "Sign Up",
    logout: "Logout",
    footerText: "2025 UEA Software Engineering Group 111",
    email: "Email Address",
    password: "Password",
    register: "Register",
    dontHaveAccount: "Don't have an account?",
    invalidCredentials: ""
};
  
// Login to account
exports.login = async (req, res) => {
    const { email, password } = req.body;

     if (!email || !password) {
        return res.render('login', {
            ...loginContent,
            invalidCredentials: "Username and password required"
          });
        }

    try {
        const user = await User.findOne({ email });
        console.log(user);
        if (user === null) {
            return res.render('login', {
                ...loginContent,
                invalidCredentials: "Wrong username or password"
              });
        }else{
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', {
                ...loginContent,
                invalidCredentials: "Wrong username or password"
              });
        }
        // Create JWT token with user info
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_TOKEN, { expiresIn: '5h' });       
        
        // Set JWT token into cookie
        const userID = user._id.toString();
        console.log(userID);
        res.cookie('driver_token', token, {httpOnly: true, maxAge: 5 * 60 * 60 * 1000});
        path: '/'
        res.cookie('driver_id', userID);

        return res.redirect('/');
    }
    } catch (err) {
        console.error(err);
        return res.send(err.message);
    }
};

// Logout user
exports.logout = (req, res) => {
    res.clearCookie('driver_token', {path: '/'});
    res.clearCookie('admin_token', {path: '/'});
    res.clearCookie('driver_id', { path: '/' });
    res.clearCookie('admin_id', { path: '/' });
    res.redirect('/login');
};

// Middleware to authenticate JWT token
exports.authenticateDriver = (req, res, next) => {
    const token = req.cookies.driver_token;
    if (!token) {
        res.clearCookie('driver_token');
        res.clearCookie('driver_id');
        return res.redirect('/login');
    } 

    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if (err) {
            res.clearCookie('driver_token');
            res.clearCookie('driver_id');
            return res.redirect('/login');
        }
        req.user = user;
        next();
    });
};

exports.authenticateAdmin = (req, res, next) => {
    const token = req.cookies.admin_token;
    if (!token) {
        res.clearCookie('admin_token');
        res.clearCookie('admin_id');
        return res.redirect('/adminDashboard/login');
    } 

    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if (err) {
            res.clearCookie('admin_token');
            res.clearCookie('admin_id');
            return res.redirect('/adminDashboard/login');
        }
        req.user = user;
        next();
    })
}

exports.showLoginPage = (req, res) => {
    

    return res.render('login', {
        ...loginContent,
        invalidCredentials: ""
    })
};

