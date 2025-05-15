const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingRequestSchema = new Schema({
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'DriverUser', required: true },
    parkingLot: {type: mongoose.Schema.Types.ObjectId, ref: 'ParkingLot', required: true},
    arrivalTime: { type: Date, required: true },
    departureTime: { type: Date, required: true },
    requestStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
});

parkingRequestSchema.statics.findApprovedRequests = function() {
    return this.find({ requestStatus: 'approved'});
};

parkingRequestSchema.virtual('duration').get(function () {
    const duration = this.departureTime - this.arrivalTime;
    return duration / 1000 / 60; // Duration in minutes
})

module.exports = mongoose.model('ParkingRequest', parkingRequestSchema);
