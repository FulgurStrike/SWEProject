const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Messages = require('./messages');

const adminMessageSchema = new Schema({
    recipientEmail: { type: String, required: true}
}, { timestamps: true })

module.exports = Messages.discriminator('AdminMessage', adminMessageSchema);
