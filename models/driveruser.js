const Schema = mongoose.Schema;
const User = require('./user.js');
const mongoose = require('mongoose');

const driverUserSchema = new Schema({
    driverID: {type: String, required: true}
});

driverUserSchema.add({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type: String, enum: ['driver'], required: true}
});

driverUserSchema.methods.getDriverID = function() {
    return this.driverID;
}

module.exports = User.discriminator('DriverUser', driverUserSchema);
