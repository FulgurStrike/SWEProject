const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingSpaceSchema = new Schema({
    spaceID: {type: String, unique: true},
    isOccupied: {type: Boolean, default: false},
    isReserved: {type: Boolean, default: false}
});

parkingSpaceSchema.methods.isAvailable = function () {
    return !this.isOccupied && !this.isReserved;
};

// Custom Method to get ParkingLot (if referenced)
parkingSpaceSchema.methods.getParkingLot = function () {
    // This would need to reference a ParkingLot document if it's connected via reference
    // ParkingLot.findOne({ 'parkingSpaces._id': this._id }).then( lot => { ... });
};

module.exports = mongoose.model('ParkingSpace', parkingSpaceSchema);