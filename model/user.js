const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    contactinfo: String
});

userSchema.methods.getUsername = function() {
    return this.username;
}

userSchema.methods.getContactInfo = function() {
    return this.contactinfo;
}

userSchema.methods.updateContactInfo = function(newContactInfo) {
    this.contactinfo = newContactInfo;
    return this.contactinfo;
}

module.exports = mongoose.model('User', userSchema);