const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingSpaceSchema = new Schema({
    spaceID: {type: String, unique: true},
    isOccupied: {type: Boolean, default: false},
    isReserved: {type: Boolean, default: false},
    parkingLot: {type: mongoose.Schema.Types.ObjectId, ref: 'ParkingLot'}
});

parkingSpaceSchema.virtual('isAvailable').get(function () {
    return !this.isOccupied && !this.isReserved;
});

module.exports = mongoose.model('ParkingSpace', parkingSpaceSchema);

