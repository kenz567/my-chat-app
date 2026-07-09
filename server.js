// server.js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

// 1. Load the "bad-words" filter robot
const Filter = require('bad-words');
const filter = new Filter();

// 2. Tell the server to look in the MAIN folder for files
app.use(express.static(__dirname));

// 3. The "Home" route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 4. The "Brain" (Socket.io)
io.on('connection', (socket) => {
  console.log('A friend connected!');

  socket.on('chat message', (data) => {
    // AUTOMATIC FILTERING:
    // This cleans the text instantly!
    const cleanText = filter.clean(data.text);
    
    // Broadcast the cleaned message to everyone
    io.emit('chat message', { user: data.user, text: cleanText });
  });

  socket.on('disconnect', () => {
    console.log('A friend disconnected');
  });
});

// 5. Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
