const mockingoose = require('mockingoose');
const DriverUser = require('../models/driveruser');


describe('fetch users', () => {
  it ('should return the list of users', async () => {
    mockingoose(DriverUser).toReturn([
      {
        firstName: "Test",
        lastName: "User",
        email: "testuser@testemail.com",
        password: "testpassword",
        reg: "TESTREG"
      },
      {
        firstName: "TestTwo",
        lastName: "UserTwo",
        email: "testusertwo@testemail.com",
        password: "testpasswordtwo",
        reg: "TESTREG2"
      },
    ], 'find');
    const results = await DriverUser.find({});
    expect(results[0].email).toBe('testuser@testemail.com');
  });
});

describe('Attempt to fetch a user that does not exist', () => {
  it('should return undefined when a user is not found', async () => {
    const result = await DriverUser.findById("325732921819");
    expect(result).toBeUndefined();
  });
})

describe('Attempt to save an entry without a first name', () => {
  it ('should return with an error', async () => {
    mockingoose(DriverUser).toReturn(new Error('First Name Required'), 'save');

    return DriverUser.create({
      lastName: "Test",
      email: "test@test.com",
      password: "testpassword",
      reg: "TEST"
    }).catch(err => { expect(err.message).toBe('First Name Required') });

  });
});

