const mongoose = require('mongoose');
const User = require('./user');

const driverUserSchema = new mongoose.Schema({
  driverID: String,
  firstName: String,
  lastName: String,
  reg: String
});

driverUserSchema.methods.getDriverID = function () {
  return this.driverID;
};

const DriverUser = User.discriminator('DriverUser', driverUserSchema);

module.exports = DriverUser;
