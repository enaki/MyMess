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

const actives = {
    "1": moment("2019-10-31", "YYYY-MM-DD").unix(),
    "2": moment("2021-01-10", "YYYY-MM-DD").unix(),
    "3": moment("2021-01-20 20:20:20", "YYYY-MM-DD HH:mm:ss").unix(),
    "4": moment("2021-01-21 10:30:20", "YYYY-MM-DD HH:mm:ss").unix(),
    "5": moment("2021-01-21 10:20:20", "YYYY-MM-DD HH:mm:ss").unix(),
    "6": moment("2021-01-21 10:40:20", "YYYY-MM-DD HH:mm:ss").unix(),
    "7": moment("2021-01-15", "YYYY-MM-DD").unix(),
    "8": moment("2021-01-16", "YYYY-MM-DD").unix(),
    "9": moment("2021-01-17", "YYYY-MM-DD").unix(),
    "10": moment("2020-12-17", "YYYY-MM-DD").unix(),
    "11": moment("2019-10-31", "YYYY-MM-DD").unix(),
    "12": moment("2021-01-10", "YYYY-MM-DD").unix(),
    "13": moment("2021-01-11", "YYYY-MM-DD").unix(),
    "14": moment("2020-01-12", "YYYY-MM-DD").unix(),
    "15": moment("2021-01-13", "YYYY-MM-DD").unix(),
    "16": moment("2020-11-14", "YYYY-MM-DD").unix(),
    "17": moment("2021-01-15", "YYYY-MM-DD").unix(),
    "18": moment("2021-01-16", "YYYY-MM-DD").unix(),
    "19": moment("2021-01-17", "YYYY-MM-DD").unix(),
    "20": moment("2020-12-17", "YYYY-MM-DD").unix(),
}
const allUsers = {}
const socketsUidPair = {}
const unseenFrom = {}

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
        if (unseenFrom[data.uid] !== undefined)
            serverSocket.to(socket.id).emit("message-notifications", unseenFrom[data.uid]);
        socket.broadcast.emit('user-connected', {"uid": data.uid})
    });

    socket.on('notify-is-typing', data => {
        console.log(getMoment() + "Socket: <" + socket.id + "> set for user <" + data.username + "> and his friend <" + data.friendName + ">");
        if (allUsers[data.friendId] !== undefined) {
            const socketFriendId = allUsers[data.friendId]["socketId"];
            serverSocket.to(socketFriendId).emit("receive-is-typing", data.id);
        }
    });

    socket.on('notify-stop-typing', data => {
        console.log(getMoment() + "Socket: <" + socket.id + "> set for user <" + data.username + "> and his friend <" + data.friendName + ">");
        if (allUsers[data.friendId] !== undefined) {
            const socketFriendId = allUsers[data.friendId]["socketId"];
            serverSocket.to(socketFriendId).emit("receive-stop-typing", data.id);
        }
    });

    socket.on('friend-ids', data => {
        console.log(getMoment() + "Socket: <" + socket.id + "> Received friendList from " + data.uid + ">");
        // console.log(data.friendList);
        let friendActives = {};
        for (let idx in data.friendList) {
            let friendId = data.friendList[idx];
            if (friendId in actives) {
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
        for (let i = 0; i < messageFields.length; i++) {
            if (!data.hasOwnProperty(messageFields[i])) {
                validMessage = false;
                break;
            }
        }
        if (validMessage) {
            console.log(getMoment() + allUsers[socketsUidPair[socket.id]]["username"] + " sent a valid message. ");

            fetch('http://localhost:2020/api/messages', {
                method: 'post',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'},
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    const uid = socketsUidPair[socket.id];
                    const friendId = allUsers[uid]["friendId"];
                    if (allUsers[friendId] !== undefined) {
                        const socketFriendId = allUsers[friendId]["socketId"];
                        data["date"] = moment.now();
                        serverSocket.to(socketFriendId).emit("receive-chat-message", data);
                        serverSocket.to(socketFriendId).emit("notify-inbox");
                    }
                    if (unseenFrom[friendId] === undefined) {
                        unseenFrom[friendId] = [];
                    }

                    unseenFrom[friendId].push(uid);

                });
        } else {
            console.log(getMoment() + socketsUidPair[socket.id] + " send an invalid message ");
        }
    });
    socket.on('send-message-notifications', (uid) => {
        console.log("HEREEEEEE" + uid);
        console.log(unseenFrom[uid]);
        if (unseenFrom[uid] !== undefined) {
            serverSocket.to(socket.id).emit("message-notifications", unseenFrom[uid]);
        }
    });
    socket.on('message-notification-clear', friendId => {
        if (unseenFrom !== undefined && unseenFrom[socketsUidPair[socket.id]] !== undefined) {
            let index = unseenFrom[socketsUidPair[socket.id]].indexOf(friendId);
            if (index > -1) {
                unseenFrom[socketsUidPair[socket.id]].splice(index);
            }
            if (unseenFrom[socketsUidPair[socket.id]].length === 0) {
                delete unseenFrom[socketsUidPair[socket.id]];
            }
        }
    });
    socket.on('disconnect', () => {
        const uid = socketsUidPair[socket.id]
        console.log(getMoment() + "(Socket, User): (" + socket.id + ", " + uid + ") disconnected");
        socket.broadcast.emit('user-disconnected', {"uid": uid})
        if (allUsers[uid] !== undefined) {
            const friendId = allUsers[uid]["friendId"];
            if (allUsers[friendId] !== undefined) {
                const socketFriendId = allUsers[friendId]["socketId"];
                serverSocket.to(socketFriendId).emit("receive-stop-typing", uid)
            }
        }
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
