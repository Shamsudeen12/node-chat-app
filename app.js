var express = require('express'),
    socketIO = require('socket.io'),
    http     = require('http'),
    app     = express();

var {generateMessage, generateLocationMessage} = require('./utils/message');
var {isRealString} = require('./utils/validation');
var {Users}   = require('./utils/users');

app.use(express.static(`${__dirname}/public`));
var port = process.env.PORT || 1337;

var server = http.createServer(app);
var io     = socketIO(server);
var users = new Users();

io.on('connection',(socket) => {
  console.log('New User Connected');

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name And Room Name Are Required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} has joined the chat`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log(message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
    }
  });
});

server.listen(port, () => console.log(`Chat app running on port ${port}`));
