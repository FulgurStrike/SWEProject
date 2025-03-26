const Schema = mongoose.Schema;
const User = require('./user');
const mongoose = require('mongoose');

const driverUserSchema = new Schema({
    vehicleReg: {type: String, required: true}
});

module.exports = User.discriminator('DriverUser', driverUserSchema);
