const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fileSystem = require('fs');
const { title } = require('process');


class PMS {
  constructor() {
    this.jsonParser = bodyParser.json;
    this.PORT = 3000;
    this.pms = express();
  }

  startServer() {
    this.pms.set('view engine', 'ejs');
    this.pms.use(express.static(path.join(__dirname, 'public')));

    this.pms.get('/', (req, res) => {
      const indexContent = {
        title: "ParkName",
        siteName: "ParkName",
        home: "Home",
        about: "About",
        services: "Services",
        contact: "Contact",
        login: "Login",
        signUp: "Sign Up",
        heroHeader: "Welcome to our Website",

        footerText: "2025 Simple starter Website"
      }

      res.render('index', indexContent)

    });

    this.pms.get('/signup', (req, res) => {
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

    this.pms.get('/login', (req, res) => {
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

    this.pms.listen(this.PORT, () => {
      console.log(`Now listening on port ${this.PORT}`);
      console.log(`http::/localhost:${this.PORT}`);
    });
  }  
}

let pms = new PMS();
pms.startServer();
