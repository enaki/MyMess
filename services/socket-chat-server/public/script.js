const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

user = {
    "uid": Date.now().toString()
}

message = {
    "chatId": 1,
    "ownerId": 2,
    "text": "ajutor",
    "imagePath": "null"
}

//const name = prompt('What is your name?')
const name = "Jeff";
appendMessage('You joined')
socket.emit('establish-connection', {
    "uid": user.uid,
    "name": name,
    "friendId": "test"
});

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', {
        "uid": user.uid,
        "friendId": "test",
        "message": message
    })
    messageInput.value = ''
})

function ActiveClick(){
    appendMessage(`You Requested Actives`)
    socket.emit('request-active')
}
socket.on('request-active-response', data => {
    alert(JSON.stringify(data, null, 4));
})
function AllUserClick(){
    appendMessage(`You Requested All Users`)
    socket.emit('request-users')
}
socket.on('request-users-response', data => {
    alert(JSON.stringify(data, null, 4));
})
function SocketPairClick(){
    appendMessage(`You Requested Sockets Pairs`)
    socket.emit('request-sockets')
}
socket.on('request-sockets-response', data => {
    alert(JSON.stringify(data, null, 4));
})
function testMessageSend(){
    appendMessage(`You Sent the test message`);
    socket.emit('send-chat-message', message);
}

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', {
        "uid": user.uid,
        "friendId": "test",
        "message": message
    })
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.className="row";
    messageElement.innerText = message
    messageContainer.append(messageElement)
}
