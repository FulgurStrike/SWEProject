const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    parkingRequest: {type: mongoose.Schema.Types.ObjectId, ref: 'ParkingRequest', required: true},
    amount: {type: Number, required: true},
    paymentStatus: {type: String, enum: ['pending', 'completed', 'failed'], required: true},
    paymentDate: {type: Date, required: true, default: Date.now},
});

module.exports = mongoose.model('Payment', paymentSchema);

