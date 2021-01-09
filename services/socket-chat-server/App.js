const moment = require('moment');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("⚠ Couldn't find .env file");
}
const port = parseInt(process.env.PORT || 3000);
const path = require('path');

//****** IMPORTANT STUFF FROM NOW
const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io');

const serverSocket = io(server, {
    cors: {
        origins: ['http://localhost:4200/']
    }
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const getMoment = () => "[" + moment().format('YYYY-MM-DD hh:mm:ss') + "] - ";

const actives = {}
const allUsers = {}
const socketsUidPair = {}

const messageFields = ["chatId", "ownerId", "text", "imagePath"]
serverSocket.on('connection', socket => {
    console.log("Socket joined " + socket.id);

    socket.on('establish-connection', data => {
        console.log(getMoment() + "Socket: <" + socket.id + "> set for user <" + data.username + "> and his friend <" + data.friendName + ">");
        actives[data.uid] = 0;
        allUsers[data.uid] = {
            "socketId": socket.id,
            "friendId": data["friendId"],
            "username": data.username
        };
        socketsUidPair[socket.id] = data.uid;
        socket.broadcast.emit('user-connected', {"uid": data.uid})
    });

    socket.on('friend-ids', data => {
        console.log(getMoment() + "Socket: <" + socket.id + "> Received friendList from " + data.uid + ">");
        console.log(data.friendList);
        let friendActives = {};
        for (let idx in data.friendList){
            let friendId = data.friendList[idx];
            if (friendId in actives){
                friendActives[friendId] = actives[friendId];
                //const friendSocketId = allUsers[friendId]["socketId"];
                //serverSocket.to(friendSocketId).emit("friend-is-active", friendActives);
            }
        }
        serverSocket.to(socket.id).emit("take-friends-status", friendActives);
    });

    socket.on('send-chat-message', data => {
        console.log("\n" + getMoment() + " Someone send a message ");
        let validMessage = true;
        for (let i = 0; i < messageFields.length; i++){
            if (!data.hasOwnProperty(messageFields[i])){
                validMessage = false;
                break;
            }
        }
        if (validMessage){
            console.log(getMoment() + allUsers[socketsUidPair[socket.id]]["username"] + " sent a valid message. ");

            fetch('http://localhost:2020/api/messages', {
                method: 'post',
                body:    JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    const uid = socketsUidPair[socket.id];
                    const friendId = allUsers[uid]["friendId"];
                    if (allUsers[friendId] !== undefined){
                        const socketFriendId = allUsers[friendId]["socketId"];
                        data["date"] = moment.now();
                        serverSocket.to(socketFriendId).emit("receive-chat-message", data);
                    }

                });
        } else {
            console.log(getMoment() + socketsUidPair[socket.id] + " send an invalid message ");
        }
    });

    socket.on('disconnect', () => {
        const uid = socketsUidPair[socket.id]
        console.log(getMoment() + "(Socket, User): (" + socket.id + ", " + uid + ") disconnected");
        socket.broadcast.emit('user-disconnected', {"uid": uid})
        actives[uid] = moment().unix();
        delete allUsers[socketsUidPair[socket.id]];
        delete socketsUidPair[socket.id];
    });

    socket.on('request-active', () => {
        console.log(getMoment() + "Request Actives from " + socket.id);
        serverSocket.to(socket.id).emit("request-active-response", actives)
    });
    socket.on('request-users', () => {
        console.log(getMoment() + "Request Users from " + socket.id);
        serverSocket.to(socket.id).emit("request-users-response", allUsers)
    });
    socket.on('request-sockets', () => {
        console.log(getMoment() + "Request Sockets from " + socket.id);
        serverSocket.to(socket.id).emit("request-sockets-response", socketsUidPair)
    });
});

server.listen(port, () => {
    console.log("Server listening on http://localhost:%d", port);
});
