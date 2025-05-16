const Message= require('../models/messages');

const helpContent = (submitMessage ='') => ({
    title: "ParkName",
    siteName: "ParkName",
    home: "Home",
    help: "Help",
    login: "Login",
    signUp: "Sign Up",
    logout: "Logout",
    footerText: "2025 Simple starter website",
    submitMessage: submitMessage
  });


exports.submitContactForm = async (req, res) => {
    try{
    const { email, message } = req.body;
    const newMessage = new Message({
        senderEmail: email,
        senderMessage: message
        });
    await newMessage.save();
    } catch (error) {
        console.error("Error saving message:", error);
        helpContent('Error saving message. Please try again later.');
        return res.render('help', helpContent('Error saving message. Please try again later.'));
    }
    helpContent('Message sent successfully!');
    res.render('help', helpContent('Message sent successfully!'));
};


exports.renderHelpPage = (req, res) => {
    res.render('help', helpContent())
};