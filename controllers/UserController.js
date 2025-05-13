const bcrypt = require('bcrypt');
const DriverUser = require('../models/driveruser');

const signupContent = {
    title: "ParkName",
    siteName: "ParkName",
    home: "Home",
    about: "About",
    services: "Services",
    contact: "Help",
    login: "Login",
    signUp: "Sign Up",
    footerText: "2025 Simple starter website",
    errorMessage: "",
    formData:{}
  };
/* Input validation
const validatePassword = (password) => {
    const minLength = 8;
    const hasNumbers = /\d/;
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/;
    return password.length >= minLength && hasNumbers.test(password) && hasSpecialChars.test(password);
}
*/ 

// Register Account
exports.registerUser = async (req, res) => {

    const { firstName, lastName, email, password, reg } = req.body;
    
    
    /* Validate the password format
    if (!validatePassword(password)) {
         return res.send('Password does not meet the requirements.');
    }
    */

    try {

        const existingUser = await DriverUser.findOne({ email });

        if(existingUser){
            console.log("duplicate email :",email)
            signupContent.errorMessage="email already in use";
            res.render('signup',signupContent)
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new DriverUser({
            firstName: firstName,
            lastName: lastName,
            email: email,  
            password: hashedPassword,
            reg: reg
        });
        await user.save();
        
        res.redirect('/login');

    } catch (err) {
        console.error('An error has occured during driver Reg: ', err.message);

        let errorMessage = "something went wrong. Please try again.";

        if(err.code == 11000 & err.keyPattern?.email){
            errorMessage ="Email is already in use. Please try another"
        }

        console.log("Error:", errorMessage);
        console.log("Form data:", req.body);

        return res.render('signup', {
            title: "ParkName",
            siteName: "ParkName",
            home: "Home",
            about: "About",
            services: "Services",
            contact: "Help",
            login: "Login",
            signUp: "Sign Up",
            footerText: "2025 Simple starter website",
            errorMessage,
            formData: req.body // send the posted form data back to fill fields
        });
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
  
    res.render('signup', signupContent);
};

