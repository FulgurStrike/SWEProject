const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingLotSchema = new Schema({
    lotName: {type: String, required: true},
    capacity: {type: Number, required: true},
    parkingSpaces: [{type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSpace'}],
    availableSpaces: {type: Number, default: 0 }
});

/*
parkingLotSchema.methods.getAvailableSpaces = async function() {
    const spaces = await mongoose.model('ParkingSpace').find({ parkingLot: this._id });
    return spaces.filter(space => space.isAvailable());
};
*/

parkingLotSchema.virtual('availableSpaces').get(function() {
    return this.parkingSpaces.filter(space => !space.isOccupied && !space.isReserved);
});

module.exports = mongoose.model('ParkingLot', parkingLotSchema);