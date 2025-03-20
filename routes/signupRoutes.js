const express = require('express');
const router = express.Router();

router.get('/signup', (req, res) => {
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
    }
      res.render('signup', signupContent)
  });

  module.exports = router;
