const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const driverUserSchema = new Schema({
  driverID: {type: String},
  firstName: {type: String},
  lastName: {type: String},
  vehicleReg: {type: String, required: true}
});

driverUserSchema.methods.getDriverID = function () {
  return this.driverID;
};

module.exports = User.discriminator('DriverUser', driverUserSchema);

