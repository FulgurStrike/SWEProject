const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingLotSchema = new Schema({
    lotName: {type: String, required: true},
    capacity: {type: Number, required: true},
    parkingSpaces: [{type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSpace'}]
});

parkingLotSchema.methods.getAvailableSpaces = function() {
    return this.parkingSpaces.filter(space => space.isAvailable());
};

module.exports = mongoose.model('ParkingLot', parkingLotSchema);