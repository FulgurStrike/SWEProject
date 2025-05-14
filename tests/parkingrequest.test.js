const mockingoose = require('mockingoose');
const ParkingRequest = require('../models/parkingrequest');
const DriverUser = require('../models/driveruser');

const testDriverOne = new DriverUser({
  firstName: "Test",
  lastName: "DriverOne",
  email: "testdriverone@test.com",
  password: "TestPassword",
  reg: "test"
});

const testDriverTwo = new DriverUser({
  firstName: "Test",
  lastName: "DriverTwo",
  email: "testdrivertwo@test.com",
  password: "TestPasswordTwo",
  reg: "testtwo"
});

describe('fetch Parking Requests', () => {
  it ('should return the list of Parking Requests', async () => {
    mockingoose(ParkingRequest).toReturn([
      {
        driver: testDriverOne,
        arrivalTime: new Date(Date.now()),
        departureTime: new Date(new Date('2025-06-10T14:30:00Z'))
      },
      {
        driver: testDriverTwo,
        arrivalTime: new Date(Date.now()),
        departureTime: new Date(new Date('2025-06-10T14:30:00Z'))
      },
    ], 'find');
    const results = await ParkingRequest.find({});
    expect(results[1].departureTime.toString()).toBe("Tue Jun 10 2025 15:30:00 GMT+0100 (British Summer Time)");
  });
});

describe('Attempt to fetch a Parking Lot that does not exist', () => {
  it('should return undefined when a parking lot is not found', async () => {
    const result = await ParkingRequest.findById("325732921819");
    expect(result).toBeUndefined();
  });
})

describe('Attempt to save an entry without a driver', () => {
  it ('should return with an error', async () => {
    mockingoose(ParkingRequest).toReturn(new Error('Driver Required'), 'save');

    return ParkingRequest.create({
      arrivalTime: new Date(Date.now()),
      departureTime: new Date(new Date('2025-06-10T14:30:00Z'))
    }).catch(err => { expect(err.message).toBe('Name Required') });

  });
});
