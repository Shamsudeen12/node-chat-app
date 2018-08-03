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
    from: 'Admin',
    text: 'Welcome to the chat app'
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new user just joined'
  });

  socket.on('createMessage', (message) => {
    console.log(message);
    io.emit('newMessage', { 
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => console.log(`Chat app running on port ${port}`));