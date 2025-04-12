const mongoose = require('mongoose');

const parkingLotSchema = new mongoose.Schema({
  parkingLotID: Number,
  lotName: String,
  capacity: Number,
  parkingSpaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSpace' }]
});

parkingLotSchema.methods.getParkingLotID = function () {
  return this.parkingLotID;
};

parkingLotSchema.methods.getLotName = function () {
  return this.lotName;
};

parkingLotSchema.methods.getCapacity = function () {
  return this.capacity;
};

parkingLotSchema.methods.getParkingSpaces = function () {
  return this.parkingSpaces;
};

module.exports = mongoose.model('ParkingLot', parkingLotSchema);
