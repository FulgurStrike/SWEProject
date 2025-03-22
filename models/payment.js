const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    driver: {type: mongoose.Schema.Types.ObjectId, ref: 'DriverUser', required: true},
    amount: {type: Number, required: true},
    paymentMethod: {type: String, required: true},
    paymentStatus: {type: String, enum: ['pending', 'completed', 'failed'], required: true}
});

paymentSchema.methods.updateStatus = function(status) {
    this.paymentStatus = status;
    return this.paymentStatus;
};

module.exports = mongoose.model('Payment', paymentSchema);