const bcrypt = require('bcrypt');
const DriverUser = require('../models/driveruser');

// Input validation
const validatePassword = (password) => {
    const minLength = 8;
    const hasNumbers = /\d/;
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/;
    return password.length >= minLength && hasNumbers.test(password) && hasSpecialChars.test(password);
} 

// Register Account
exports.registerUser = async (req, res) => {

    const { firstName, lastName, email, password, reg } = req.body;
    
    // Validate the password format
    if (!validatePassword(password)) {
         return res.send('Password does not meet the requirements.');
    }

    try {

        const existingUser = await DriverUser.findOne({ email });

        if (existingUser) {
            return res.send('Email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new DriverUser({
            firstName: firstName,
            lastName: lastName,
            email: email,  
            password: hashedPassword,
            reg: reg
        });
        await user.save();
        //return res.send('User registered successfully');
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        return res.send(err.message);
    }
};

// exports.showUserProfile = async (req, res) => {
//     const { userID } = req.user; // Assuming JWT middleware populates req.user
//     try {
//         const user = await User.findById(userId);
//         return res.status(200).json(user);
//     } catch (err) {
//         return res.status(500).send(err.message);
//     }
// }
// // Update account details
// exports.updateUser = async (req, res) => {
//     const { userId } = req.user; // Assuming JWT middleware populates req.user
//     const { email } = req.body;
//
//     try {
//         const user = await DriverUser.findByIdAndUpdate(
//             userID,
//             { email },
//             { new: true } // Return updated document
//         );
//         return res.status(200).json(user);
//     } catch (err) {
//         console.error(err);
//         return res.status(500).send(err.message);
//     }
// };


// Render sign up page
exports.showSignupPage = (req, res) => {
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
    };
      res.render('signup', signupContent);
};
