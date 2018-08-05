var socket = io();
var locationBtn = $('#send-location');
var messageTextbox = $('[name=message]');

socket.on('connect', function () {
  console.log("Connected to server");
});

socket.on('disconnect', function () {
  console.log("Disconnected from server");
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  $('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  $('#messages').append(html);
});

$('#message-form').on("submit", function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

locationBtn.on("click", function (position) {
  if(!navigator.geolocation) {
    return alert("Your browser does not support geolocation, update it and try again!");
  }

  locationBtn.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationBtn.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationBtn.removeAttr('disabled').text('Send location')
    alert("Oops!, unable to fetch location");
  });
});
