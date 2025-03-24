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

userSchema.methods.updateContactInfo = async function(newContactInfo) {
    if (!newContactInfo.phone && !newContactInfo.email && !newContactInfo.address) {
        throw new Error('At least one contact field is needed');
        
    }
    this.contactinfo = newContactInfo;
    await this.save();
    return this.contactinfo;
}

module.exports = mongoose.model('User', userSchema);