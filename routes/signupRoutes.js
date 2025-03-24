const express = require('express');
const router = express.Router();
const { createHash } = require('crypto');
const User = require('../models/driveruser');


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
      footerText: "2025 Simple starter website",
      user: new DriverUser(),
    }
      res.render('signup', signupContent)
  });


function hashPassword(passwd) {
  return createHash('sha256').update(passwd).digest('hex');
}

router.get('/signup/getall', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch {
    console.error("Error")
  }
});

router.post('/', async (req, res) => {

  const password = hashPassword(req.body.password);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    reg: req.body.registrationPlate,
    password: password,
  })

  try {
    const newUser = await user.save()
    res.redirect(`/login`);
  } catch {
    res.render('/signup', {
      user: user,
    })
  }
});

module.exports = router;
