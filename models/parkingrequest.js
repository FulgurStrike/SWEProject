const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingRequestSchema = new Schema({
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'DriverUser', required: true },
    destination: { type: String, required: true },
    arrivaltime: { type: Date, required: true },
    departuretime: { type: Date, required: true },
    assignedspace: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSpace' },
    requeststatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
});

parkingRequestSchema.methods.updateRequestStatus = async function (status) {
    this.requeststatus = status;
    await this.save();
    return this.requeststatus;
};

module.exports = mongoose.model('ParkingRequest', parkingRequestSchema);