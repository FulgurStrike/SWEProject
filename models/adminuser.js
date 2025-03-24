const Schema = mongoose.Schema;
const User = require('./user');
const mongoose = require('mongoose');

const adminUserSchema = new Schema({
    adminID: {type: String, required: true}
});

adminUserSchema.methods.getAdminID = function() {
    return this.adminID;
};

module.exports = User.discriminator('AdminUser', adminUserSchema);