const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const adminUserSchema = new Schema({
  adminID: { type: String }
});

// Middleware to check if there is already an existing AdminUser document
adminUserSchema.pre('save', async function (next) {
    if (this.isNew) {
        const existingAdmin = await mongoose.model('AdminUser').countDocuments();
        if (existingAdmin > 0) {
            const error = new Error('Only one admin user is allowed');
            return next(error);
        }
    }
    next();
})

module.exports = User.discriminator('AdminUser', adminUserSchema);

