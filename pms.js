const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const loginRoutes = require('./routes/loginRoutes');
const indexRoutes = require('./routes/indexRoutes');
const signupRoutes = require('./routes/signupRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const connectDB = require('./config/database');
dotenv.config(); // Load environment variables from .env

class PMS {
  constructor() {
    this.jsonParser = bodyParser.json;
    this.PORT = process.env.PORT || 3000;
    this.pms = express();
  }

  async startServer() {
    this.pms.set('view engine', 'ejs');
    this.pms.use(express.static(path.join(__dirname, 'public')));
    this.pms.use(bodyParser.urlencoded({extended: true}));

    // Passes the login status to the views
    this.pms.use((req, res, next) => {
      const token = req.cookies.auth_token; // Check for JWT Token
      res.locals.isLoggedIn = token ? true : false;
      next();
    });

    // MongoDB connection
    await connectDB();

    // Middleware to authenticate JWT token (for protected routes)
    this.pms.use((req, res, next) => {
      const token = req.cookies.auth_token; // Accessing JWT token from cookie
      if (token) {
        jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
          if (err) {
            return res.status(403).send('Forbidden');
          }
          req.user = user; // Attach user data to request
          next();
        });
      } else {
        next(); // Continue even if there's no token
      }
    });
    
    // Routes
    this.pms.use(loginRoutes);
    this.pms.use(indexRoutes);
    this.pms.use(signupRoutes);
    this.pms.use(paymentRoutes);

    this.pms.listen(this.PORT, () => {
      console.log(`Now listening on port ${this.PORT}`);
      console.log(`http::/localhost:${this.PORT}`);
    });

  }   
}

let pms = new PMS();
pms.startServer();
