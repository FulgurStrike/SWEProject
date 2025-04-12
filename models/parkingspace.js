const mongoose = require('mongoose');

const parkingSpaceSchema = new mongoose.Schema({
  spaceID: String,
  isOccupied: Boolean,
  isReserved: Boolean,
  parkingLot: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingLot' }
});

parkingSpaceSchema.methods.getSpaceID = function () {
  return this.spaceID;
};

parkingSpaceSchema.methods.getParkingLot = function () {
  return this.parkingLot;
};

parkingSpaceSchema.methods.isAvailable = function () {
  return !this.isOccupied && !this.isReserved;
};

module.exports = mongoose.model('ParkingSpace', parkingSpaceSchema);
