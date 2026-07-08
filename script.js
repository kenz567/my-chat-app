// 1. Get the parts of the page we need to use
const sendButton = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');
const chatBox = document.getElementById('chat-box');

// 2. Tell the button what to do when clicked
sendButton.addEventListener('click', () => {
    const message = messageInput.value;

    if (message !== "") {
        // A. Show the message on your screen immediately
        const newMessage = document.createElement('p');
        newMessage.textContent = "You: " + message;
        chatBox.appendChild(newMessage);

        // B. Clear the input box so you can type again
        messageInput.value = '';

        // C. (This is for later) This sends the message to your "brain" (server)
        // We will fill this part in once the server is ready to receive data!
        console.log("Sending message to server:", message);
    }
});