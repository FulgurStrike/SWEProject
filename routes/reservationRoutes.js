const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // if (!req.session.user) {
    //   return res.redirect('/login');
    // }

    const loginContent = {
      title: "ParkName",
      siteName: "ParkName",
      home: "Home",
      about: "About",
      contact: "Contact",
      login: "Login",
      signUp: "Sign Up",
      footerText: "2025 Simple starter website"
    }  

    res.render('reservation', loginContent);
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;
