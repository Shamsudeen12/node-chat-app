const expect = require('expect'),
      {generateMessage, generateLocationMessage} = require('./../utils/message');


describe('generateMessage', () => {
  it('Should generate correct message object', () => {
    var from = 'Shamsudeen';
    var text = 'This is the test suite';
    var message = generateMessage('Shamsudeen', 'This is the test suite');
    expect(message.from === from);
    expect(message.text === text);
    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate current location', () => {
    var from = 'Admin';
    var latitude = 1;
    var longitude = 1;
    var locationMessage = generateLocationMessage(from, latitude, longitude);
    expect(locationMessage.url === '`https://www.google.com/maps?q=1,1');
    expect(locationMessage.from === from);
    expect(locationMessage.createdAt).toBeA('number');
  });
});