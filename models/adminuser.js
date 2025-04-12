const mongoose = require('mongoose');
const User = require('./user');

const adminUserSchema = new mongoose.Schema({
  adminID: String
});

adminUserSchema.methods.getAdminID = function () {
  return this.adminID;
};

const AdminUser = User.discriminator('AdminUser', adminUserSchema);

module.exports = AdminUser;
