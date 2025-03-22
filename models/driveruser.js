
const User = require('./user.js');
const mongoose = require('mongoose');

const driverUserSchema = new mongoose.Schema({
    driverID: String
});

driverUserSchema.methods.getDriverID = function() {
    return this.driverID;
}

module.exports = User.discriminator('DriverUser', driverUserSchema);

