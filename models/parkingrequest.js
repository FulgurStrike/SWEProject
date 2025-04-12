const mongoose = require('mongoose');

const parkingRequestSchema = new mongoose.Schema({
  requestID: String,
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'DriverUser' },
  destination: String,
  arrivalTime: Date,
  departureTime: Date,
  assignedSpace: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSpace', default: null },
  requestStatus: String
});

parkingRequestSchema.methods.getRequestID = function () {
  return this.requestID;
};

parkingRequestSchema.methods.getDriverID = function () {
  return this.driver;
};

parkingRequestSchema.methods.getDestination = function () {
  return this.destination;
};

parkingRequestSchema.methods.setDestination = function (destination) {
  this.destination = destination;
};

parkingRequestSchema.methods.getArrivalTime = function () {
  return this.arrivalTime;
};

parkingRequestSchema.methods.setArrivalTime = function (time) {
  this.arrivalTime = time;
};

parkingRequestSchema.methods.getDepartureTime = function () {
  return this.departureTime;
};

parkingRequestSchema.methods.setDepartureTime = function (time) {
  this.departureTime = time;
};

parkingRequestSchema.methods.getAssignedSpace = function () {
  return this.assignedSpace;
};

parkingRequestSchema.methods.updateAssignedSpace = function (space) {
  this.assignedSpace = space;
};

parkingRequestSchema.methods.getRequestStatus = function () {
  return this.requestStatus;
};

parkingRequestSchema.methods.updateRequestStatus = function (status) {
  this.requestStatus = status;
};

module.exports = mongoose.model('ParkingRequest', parkingRequestSchema);
