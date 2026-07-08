// Replace this with the link Render gives you after you deploy!
const socket = io('https://your-render-app-name.onrender.com'); 
let username = "";

// Login function
function login() {
    username = document.getElementById('username').value;
    if (username) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('chat-screen').style.display = 'block';
    }
}

// Sending messages
const sendBtn = document.getElementById('send-btn');
const input = document.getElementById('message-input');
const chatBox = document.getElementById('chat-box');

sendBtn.addEventListener('click', () => {
    const msg = input.value;
    if (msg) {
        // Send nickname + message to the server
        socket.emit('chat message', { user: username, text: msg });
        input.value = '';
    }
});

// Receiving messages from the server
socket.on('chat message', (data) => {
    const p = document.createElement('p');
    p.textContent = data.user + ": " + data.text;
    chatBox.appendChild(p);
});
