const mongoose = require('mongoose');
// Load environment variables from .env
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (err) {
        console.log('Error connecting to MongoDB', err);
    }
};

module.exports = connectDB;