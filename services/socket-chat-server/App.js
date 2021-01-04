const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const users = {}

// Routing
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', socket => {
    console.log("Socket joined " + socket.id);

    socket.on('new-user', name => {
        console.log("Socket, " + socket.id + " set user " + name);
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    });
    socket.on('send-chat-message', message => {
        console.log("Socket, " + socket.id + " send chat " + message);
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    });
    socket.on('disconnect', () => {
        console.log("Socket, " + socket.id + "disconnected");
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    });
});

server.listen(port, () => {
    console.log("Server listening on http://localhost:%d", port);
});
