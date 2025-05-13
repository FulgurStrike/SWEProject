const mongoose = require('mongoose');
// Load environment variables from .env
require('dotenv').config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URL;
        if (!mongoURI) {
            throw new Error('MongoDB URI missing from .env file');
        }
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.log('Error connecting to MongoDB', err);
    }
};

module.exports = connectDB;
