const express = require('express');
const router = express.Router();
const User = require("../models/driveruser");
const { createHash } = require('crypto');

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

router.get('/login', (req, res) => {
  res.render('login', loginContent)
});

function hashPassword(passwd) {
 return createHash('sha256').update(passwd).digest('hex');
}

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  userQuery = await User.findOne({ "email": `${email}` });

  if (email === userQuery.email && hashPassword(password) === userQuery.password) {
    req.session.user = { email };
    res.redirect('/');
  } else {
    loginContent.invalidCredentials = "Invalid credentials try again";
    res.render('login', loginContent);
    loginContent.invalidCredentials = "";
  } 
});

module.exports = router;
