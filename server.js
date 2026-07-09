// server.js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

// 1. Tell the server to look in the MAIN folder for files
app.use(express.static(__dirname));

// 2. The "Home" route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- PROFANITY FILTER ---
// ADD YOUR WORDS HERE:
const badWords = ['fuck', 'shit', 'idiot', 'bitch', 'kys', 'kill', 'kill urself', 'kill yourself', 'test words btw', '']; 

function filterMessage(text) {
  let cleanedText = text;
  badWords.forEach(word => {
    // 'gi' makes it case-insensitive (catches 'BadWord' and 'badword')
    const regex = new RegExp(word, 'gi'); 
    cleanedText = cleanedText.replace(regex, '***');
  });
  return cleanedText;
}
// ------------------------

// 3. The "Brain" (Socket.io)
io.on('connection', (socket) => {
  console.log('A friend connected!');

  socket.on('chat message', (data) => {
    // Apply the filter before broadcasting the message
    const cleanText = filterMessage(data.text);
    
    // Broadcast the cleaned message to everyone
    io.emit('chat message', { user: data.user, text: cleanText });
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
