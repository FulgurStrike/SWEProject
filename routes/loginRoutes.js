const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
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
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    const validEmail = 'user@example.com';
    const validPassword = 'password';

    if (email === validEmail && password === validPassword) {
      req.session.user = { email };
      res.redirect('/');
    } else {
      res.send('invalid credentials');
    }
});

module.exports = router;