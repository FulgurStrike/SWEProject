const express = require('express');
const router = express.Router();
const User = require("../models/driveruser");
const { createHash } = require('crypto');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

jwt_key = process.env.SECRET_KEY || '23cbeadfddeda57e3ed601433040cdd4a3d7c13ccbf14ed6ab46b0c4231b2e478e8ac0a71cdd469dff56fbd2e35c6a9e85a45c904f2296abc0b212ddd2a42633';

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
      invalidCredentials: "",
    }

  

    function authenticateToken(req, res, next) {
      const token = req.cookies.token;
    
      if (!token) return res.redirect('/login');
    
      jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
      });
    }
 //^^^^^^ continuously checks if they user is logged in to the website via cookie-parser ^^^^^^

router.get('/login', (req, res) => {
  res.render('login', loginContent)
});

function hashPassword(passwd) {
 return createHash('sha256').update(passwd).digest('hex');
}

router.post('/login', async (req, res) => {

  const { email, password} = req.body;

  const userQuery = await User.findOne({ email});

  if(!userQuery){
    loginContent.invalidCredentials = "Invalid credentials try again.";
    return res.render('login', loginContent);
  }

  const hashedPassword = hashPassword(password);

  if (hashedPassword == userQuery.password){
    const token = jwt.sign(
      {email: userQuery.email, id:userQuery._id },
      jwt_key ,
      { expiresIn: '1h' } //idk the time we have set yet  
  );

  res.cookie('token', token, {httpOnly:true});
  res.redirect('/');
} else{
  loginContent.invalidCredentials = "Invalid credentials try again";
  res.render('login',loginContent)
}
  // if (email === userQuery.email && hashPassword(password) === userQuery.password) {
  //   req.session.user = { email };
  //   res.redirect('/');
  // } else {
  //   loginContent.invalidCredentials = "Invalid credentials try again";
  //   res.render('login', loginContent);
  //   loginContent.invalidCredentials = "";
  // } 
  

  //when they get the /logout (click the logout button all the cookies will reset and they'll get redirected back to login)
  router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
  });
});

module.exports = router;
