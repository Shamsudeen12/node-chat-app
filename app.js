const express = require('express'),
      socketIO = require('socket.io'),
      http     = require('http'),
      app     = express();

const {generateMessage, generateLocationMessage} = require('./utils/message');

app.use(express.static(`${__dirname}/public`));
const port = process.env.PORT || 1337;

var server = http.createServer(app);
var io     = socketIO(server);

io.on('connection',(socket) => {
  console.log('New User Connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage',generateMessage('Admin', 'New User Joined'));

  socket.on('createMessage', (message, callback) => {
    console.log(message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => console.log(`Chat app running on port ${port}`));