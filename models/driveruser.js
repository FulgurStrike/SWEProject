const Schema = mongoose.Schema;
const User = require('./user');
const mongoose = require('mongoose');

const driverUserSchema = new Schema({
    driverID: {type: String, required: true}
});

driverUserSchema.methods.getDriverID = function() {
    return this.driverID;
}

module.exports = User.discriminator('DriverUser', driverUserSchema);
