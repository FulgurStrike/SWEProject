const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingSpaceSchema = new Schema({
    spaceID: {type: String, unique: true},
    isOccupied: {type: Boolean, default: false},
    isReserved: {type: Boolean, default: false},
    parkingLot: {type: mongoose.Schema.Types.ObjectId, ref: 'ParkingLot'}
});

parkingSpaceSchema.methods.isAvailable = function () {
    return !this.isOccupied && !this.isReserved;
};

// Custom Method to get ParkingLot (if referenced)
parkingSpaceSchema.methods.getParkingLot = async function () {
    const parkingLot = await mongoose.model('ParkingLot').findById(this.parkingLot);
    return parkingLot;
};

module.exports = mongoose.model('ParkingSpace', parkingSpaceSchema);