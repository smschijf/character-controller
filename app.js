const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve the controller.html and character.html files
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/controller.html');
});
app.get('/character', (req, res) => {
  res.sendFile(__dirname + '/character.html');
});

// Keep track of the character's position
let position = {
  x: 0,
  y: 0
};

// Listen for connections from the controller
io.on('connection', socket => {
  console.log('Controller connected');

  // Send the current position of the character to the controller
  socket.emit('position', position);

  // Listen for messages from the controller
  socket.on('move', direction => {
    console.log('Controller moved ' + direction);

    // Send the updated position to the character
    io.emit('move', position);
  });
});

// Start the server
const port = 3000;
http.listen(port, () => {
  console.log('Server listening on port ' + port);
});
