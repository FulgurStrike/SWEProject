const Schema = mongoose.Schema;
const User = require('./user.js');
const mongoose = require('mongoose');

const adminUserSchema = new Schema({
    adminID: {type: String, required: true}
});

adminUserSchema.add({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type: String, enum: ['admin'], required: true}
});

adminUserSchema.methods.getAdminID = function() {
    return this.adminID;
};

module.exports = mongoose.model('AdminUser', adminUserSchema);