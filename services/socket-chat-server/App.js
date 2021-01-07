const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
app.enable('trust proxy');

const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io');
const moment = require('moment');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("⚠ Couldn't find .env file");
}
const port = parseInt(process.env.PORT || 3000);

//nu merge nici asa
// const serverSocket = io(server, { origins: '*:*'});
const serverSocket = io(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));
// Add headers

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const actives = {}
const allUsers = {}
const socketsUidPair = {}

const messageFields = ["chatId", "ownerId", "text", "imagePath"]

serverSocket.on('connection', socket => {
    console.log("Socket joined " + socket.id);

    socket.on('establish-connection', data => {
        console.log("Socket, " + socket.id + " set user " + data.name);
        actives[data.uid] = "on";
        allUsers[data.uid] = {
            "socketId": socket.id,
            "friendId": data["friendId"]
        };
        socketsUidPair[socket.id] = data.uid;
        socket.broadcast.emit('user-connected', {"uid": data.uid})
    });

    socket.on('send-chat-message', data => {
        console.log("Socket, " + socket.id + " set user " + data.name);
        let validMessage = true;
        for (let i = 0; i < messageFields.length; i++){
            if (!data.hasOwnProperty(messageFields[i])){
                validMessage = false;
                break;
            }
        }
        if (validMessage){
            console.log(socketsUidPair[socket.id] + " send a valid message ");

            fetch('http://localhost:2020/api/messages', {
                method: 'post',
                body:    JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(json => console.log(json));
        } else {
            console.log(socketsUidPair[socket.id] + " send an invalid message ");
        }
    });

    socket.on('disconnect', () => {
        const uid = socketsUidPair[socket.id]
        console.log("(Socket, User): (" + socket.id + ", " + uid + ") disconnected");
        socket.broadcast.emit('user-disconnected', {"uid": uid})
        actives[uid] = moment().unix();
        delete socketsUidPair[socket.id];
    });

    socket.on('request-active', () => {
        console.log("Request Actives from " + socket.id);
        serverSocket.to(socket.id).emit("request-active-response", actives)
    });
    socket.on('request-users', () => {
        console.log("Request Users from " + socket.id);
        serverSocket.to(socket.id).emit("request-users-response", allUsers)
    });
    socket.on('request-sockets', () => {
        console.log("Request Sockets from " + socket.id);
        serverSocket.to(socket.id).emit("request-sockets-response", socketsUidPair)
    });
});

server.listen(port, () => {
    console.log("Server listening on http://localhost:%d", port);
});
