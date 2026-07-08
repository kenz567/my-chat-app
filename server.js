// server.js
const express = require('express');
const app = express();
const path = require('path');

// This tells the server to look in the 'public' folder for website files
app.use(express.static('public'));

// This is where you will eventually add "Login" and "Chat" logic
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});