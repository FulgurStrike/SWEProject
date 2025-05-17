const Message= require('../models/messages');

const helpContent = (submitMessage ='') => ({
    title: "UEA Park",
    siteName: "UEA Park",
    home: "Home",
    help: "Help",
    login: "Login",
    signUp: "Sign Up",
    logout: "Logout",
    footerText: "2025 UEA Software Engineering Group 111",
    instructionTitle: "How To Use This Website",
    howOne: "Register an account",
    howTwo: "Login to your account",
    howThree: "Navigate to the home/reservation page from the header",
    howFour: "Enter your desired location, time, and vehicle registration",
    howFive: "Click on the 'Reserve Spot' button",
    howSix: "Complete your payment using one of the available methods",
    q: "Q:",
    a: "A:",
    questionOne: "What if I'm running late?",
    answerOne: "Please notify support through the contact form.",
    questionTwo: "How do I know which parking lot to choose?",
    answerTwo: "You can check the parking lot details on the reservation page.",
    questionThree: "Do I need to print my reservation?",
    answerThree: "No, the system will record your number plate.",
    contactUs: "Contact Us",
    email: "Email",
    subject: "Subject",
    message: "Message",
    sendMessage: "Send Message",
    FAQ: "FAQ",
    submitMessage: submitMessage
  });


exports.submitContactForm = async (req, res) => {
    try{
    const { email, subject, message } = req.body;
    const newMessage = new Message({
        senderEmail: email,
        senderMessage: message,
        senderSubject: subject
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
