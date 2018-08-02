const express = require('express'),
      socketIO = require('socket.io'),
      http     = require('http'),
      app     = express();

app.use(express.static(`${__dirname}/public`));
const port = process.env.PORT || 1337;
var server = http.createServer(app);
var io     = socketIO(server);

io.on('connection',(socket) => {
  console.log('New User Connected');

  socket.emit('newMessage', {
    from: 'mike@example.com',
    text: 'Hey, what\'s going on',
    createdAt: 123
  });

  socket.on('createMessage', (createMessage) => {
    console.log(createMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => console.log(`Chat app running on port ${port}`));