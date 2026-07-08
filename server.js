const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

app.use(express.static('public'));

// When someone connects to the chat
io.on('connection', (socket) => {
  console.log('A friend connected!');

  // When the server gets a message, send it to everyone!
  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
