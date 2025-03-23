const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const dotenv = require('dotenv');

const ParkingController = require('./controllers/ParkingController');
const ParkingRequestController = require('./controllers/ParkingRequestController');
const PaymentController = require('./controllers/PaymentController');
const AdminController = require('./controllers/adminController');
const UserController = require('./controllers/UserController');
const AuthenticationController = require('./controllers/AuthenticationController');


const indexRoutes = require('./routes/indexRoutes');
const loginRoutes = require('./routes/loginRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
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

    // Store the session
    this.pms.use(cookieSession({
      name: 'session',
      keys: [process.env.SESSION_SECRET ||'default_secret_key'], // Use a secret key for signing in the session cookies
      maxAge: 24 * 60 * 60 * 1000 // Session expiry time 1 day
    }));

    // Passes the login status to the views
    this.pms.use((req, res, next) => {
      res.locals.isLoggedIn = req.session.user ? true : false; // Add isLoggedIn variable to the view
      next();
    });

    // MongoDB connection
    await connectDB();
    
    // Routes
    this.pms.use(indexRoutes);
    this.pms.use(loginRoutes);
    this.pms.use(reservationRoutes);
    this.pms.use(signupRoutes);
    this.pms.use(paymentRoutes);

    // Controllers
    this.pms.use(ParkingController);
    this.pms.use(ParkingRequestController);
    this.pms.use(PaymentController);
    this.pms.use(AdminController);
    this.pms.use(UserController);
    this.pms.use(AuthenticationController);

    this.pms.listen(this.PORT, () => {
      console.log(`Now listening on port ${this.PORT}`);
      console.log(`http::/localhost:${this.PORT}`);
    });

  }   
}

let pms = new PMS();
pms.startServer();
