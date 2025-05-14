const mockingoose = require('mockingoose');
const ParkingLot = require('../models/parkinglot');


describe('fetch Parking Lots', () => {
  it ('should return the list of Parking Lots', async () => {
    mockingoose(ParkingLot).toReturn([
      {
        lotName: "Test Lot",
        capacity: 24,
        parkingSpaces: []
      },
      {
        lotName: "Test Lot 2",
        capacity: 34,
        parkingSpaces: []
      },
    ], 'find');
    const results = await ParkingLot.find({});
    expect(results[1].capacity).toBe(34);
  });
});

describe('Attempt to fetch a Parking Lot that does not exist', () => {
  it('should return undefined when a parking lot is not found', async () => {
    const result = await ParkingLot.findById("325732921819");
    expect(result).toBeUndefined();
  });
})

describe('Attempt to save an entry without a name', () => {
  it ('should return with an error', async () => {
    mockingoose(ParkingLot).toReturn(new Error('Name Required'), 'save');

    return ParkingLot.create({
      capacity: 12,
      parkingSpaces: []
    }).catch(err => { expect(err.message).toBe('Name Required') });

  });
});
