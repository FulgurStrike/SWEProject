const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email:  String,
  password: String,
});

userSchema.methods.getUsername = function () {
  return this.username;
};

userSchema.methods.getContactInfo = function () {
  return this.contactInfo;
};

userSchema.methods.updateContactInfo = function (newContactInfo) {
  this.contactInfo = newContactInfo;
};

module.exports = mongoose.model('User', userSchema);
