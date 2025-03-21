const express = require('express');
const router = express.Router();

router.get('/payment', (req, res) => {
    const paymentContent = {
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

    res.render('payment', paymentContent)
});

module.exports = router;