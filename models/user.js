const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactinfo: {
        phone: { type: String },
        email: { type: String},
        address: { type: String},
    },
    role: {type: String, enum: ['driver', 'admin'], required: true}
});

userSchema.methods.getUsername = function() {
    return this.username;
}

userSchema.methods.getContactInfo = function() {
    return this.contactinfo;
}

userSchema.methods.updateContactInfo = function(newContactInfo) {
    this.contactinfo = newContactInfo;
    return this.save();
}

module.exports = mongoose.model('User', userSchema);