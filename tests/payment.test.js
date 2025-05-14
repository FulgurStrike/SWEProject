const mockingoose = require('mockingoose');
const ParkingRequest = require('../models/parkingrequest');
const Payment = require('../models/payment');
const DriverUser = require('../models/driveruser');
const payment = require('../models/payment');

const testDriverOne = new DriverUser({
  firstName: "Test",
  lastName: "DriverOne",
  email: "testdriverone@test.com",
  password: "TestPassword",
  reg: "test"
});

const testRequest = new ParkingRequest({
  driver: testDriverOne,
  arrivalTime: new Date(Date.now()),
  departureTime: new Date(new Date('2025-06-10T14:30:00Z'))
});


describe('fetch Payments', () => {
  it ('should return the list of Payments', async () => {
    mockingoose(Payment).toReturn([
      {
        parkingRequest: testRequest,
        amount: 24,
        paymentStatus: 'completed',
        paymentDate: new Date(Date.now())
      }, 
      {
        parkingRequest: testRequest,
        amount: 31,
        paymentStatus: 'failed',
        paymentDate: new Date(Date.now())
      },
    ], 'find');
    const results = await Payment.find({});
    expect(results[1].parkingRequest.driver.firstName).toBe("Test");
  });
});

describe('Attempt to fetch a Paymentthat does not exist', () => {
  it('should return undefined when a payment is not found', async () => {
    const result = await Payment.findById("325732921819");
    expect(result).toBeUndefined();
  });
})

describe('Attempt to save an entry without a parking request', () => {
  it ('should return with an error', async () => {
    mockingoose(Payment).toReturn(new Error('Parking Request Required'), 'save');

    return Payment.create({
      amount: 50,
      paymentStatus: 'completed',
      paymentDate: new Date(Date.now())
    }).catch(err => { expect(err.message).toBe('Parking Request Required') });

  });
});
