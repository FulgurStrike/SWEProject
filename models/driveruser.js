
const User = require('./user.js');
const mongoose = require('mongoose');

const driverUserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  reg: String,
});

driverUserSchema.methods.getDriverID = function() {
    return this.driverID;
}

DriverUser = User.discriminator('DiverUser', driverUserSchema);

module.exports = DriverUser

