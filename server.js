// server.js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

// 1. Tell the server to look in the 'public' folder for files (CSS, JS, HTML)
app.use(express.static(path.join(__dirname, 'public')));

// 2. The "Home" route: When someone visits your URL, send them the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 3. The "Brain" (Socket.io): This handles real-time messaging
io.on('connection', (socket) => {
  console.log('A friend connected!');

  // When the server gets a 'chat message' from one person,
  // it immediately sends it to EVERYONE connected (io.emit)
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
