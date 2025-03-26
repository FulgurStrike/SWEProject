const User = require('../models/user');

exports.showUserProfile() = async (req, res) => {
    const { userID } = req.user; // Assuming JWT middleware populates req.user
    try {
        const user = await User.findById(userID);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
// Update account details
exports.updateUser = async (req, res) => {
    const { userID } = req.user; // Assuming JWT middleware populates req.user
    const { username, email } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            userID,
            { username, email },
            { new: true } // Return updated document
        );
        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

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
