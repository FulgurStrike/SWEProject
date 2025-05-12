const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    senderEmail: { type: String, required: true },
    senderMessage: { type: String, required: true }
});

module.exports = mongoose.model('Message', messageSchema);