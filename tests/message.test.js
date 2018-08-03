const expect = require('expect'),
      {generateMessage} = require('./../utils/message');


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