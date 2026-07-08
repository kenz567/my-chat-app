// server.js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

// 1. Tell the server to look in the MAIN folder (not a public folder)
app.use(express.static(__dirname));

// 2. When someone visits the home URL, send them index.html from the main folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 3. The "Brain" (Socket.io)
io.on('connection', (socket) => {
  console.log('A friend connected!');

  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('A friend disconnected');
  });
});

// 4. Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
