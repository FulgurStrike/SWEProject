const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentID: String,
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'DriverUser' },
  amount: Number,
  paymentMethod: String,
  paymentStatus: String
});

paymentSchema.methods.getPaymentID = function () {
  return this.paymentID;
};

paymentSchema.methods.getAmount = function () {
  return this.amount;
};

paymentSchema.methods.updateAmount = function (newAmount) {
  this.amount = newAmount;
};

paymentSchema.methods.getPaymentMethod = function () {
  return this.paymentMethod;
};

paymentSchema.methods.updatePaymentMethod = function (newMethod) {
  this.paymentMethod = newMethod;
};

paymentSchema.methods.getPaymentStatus = function () {
  return this.paymentStatus;
};

paymentSchema.methods.updatePaymentStatus = function (newStatus) {
  this.paymentStatus = newStatus;
};

module.exports = mongoose.model('Payment', paymentSchema);
