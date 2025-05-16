const mockingoose = require('mockingoose');
const Message = require('../models/messages');


describe('fetch messages', () => {
  it ('should return the list of messages', async () => {
    mockingoose(Message).toReturn([
      {
        senderEmail: "test@senderemail.com",
        senderMessage: "This is a test message",
      },
      {
        senderEmail: "test2@senderemail.com",
        senderMessage: "This is a second test message",
      },
    ], 'find');
    const results = await Message.find({});
    expect(results[0].senderEmail).toBe('test@senderemail.com');
  });
});

describe('Attempt to fetch a message that does not exist', () => {
  it('should return undefined when a message is not found', async () => {
    const result = await Message.findById("325732921819");
    expect(result).toBeUndefined();
  });
})

describe('Attempt to save an entry without a message', () => {
  it ('should return with an error', async () => {
    mockingoose(Message).toReturn(new Error('Message Required'), 'save');

    return Message.create({
      senderEmail: "test@senderemail.com"
    }).catch(err => { expect(err.message).toBe('Message Required') });

  });
});
