const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const driverUserSchema = new Schema({
  firstName: {type: String},
  lastName: {type: String},
  reg: {type: String, required: true}
});

module.exports = User.discriminator('DriverUser', driverUserSchema);

