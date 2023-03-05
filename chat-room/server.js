const express = require('express');
const http = require('http');
const socketIO  = require('socket.io');
const path = require('node:path');

//
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    getRooms,
    addRoom
} = require('./utils/users');
const formatMessage = require('./utils/messages');


// variables setup
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = process.env.PORT || 5001;
const botName = 'Chat Room';
// 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.get('/rooms', (req, res)=>{
    res.json({
        rooms: getRooms()
    })
});

app.post('/api/add-room', (req, res)=>{
    addRoom(req.body['room-name'])
    res.redirect('/');
})


// set up socket events
io.on('connect', socket=>{
    // even when a new user joins the chat room
    socket.on('joinRoom', ({username, room})=>{
        const user = userJoin(socket.id, username, room); // join the user to the room 
        socket.join(user.room);

        // send welcome msg to current user
        socket.emit('message', formatMessage(botName, 'Welcome to Chat Room'));

        // boradcast to all other users that a new user has joined
        socket.broadcast
            .to(user.room)
            .emit(
                'message',
                formatMessage(botName, `${user.username} has joined the chat room`)
        ); 
        // send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    }); // eof join event

    // event when the client send a message
    /*
    when a user sends a message send the message to all the user including the sender
    */
    socket.on('chatMessage', msg=>{
        const user = getCurrentUser(socket.id);
        if(user){
            io.to(user.room).emit('message', formatMessage(user.username, msg));
        }
    }); 

    // event when client disconnects
    socket.on('disconnect', ()=>{
        const user = getCurrentUser(socket.id);
        if(user){
            io.to(user.room).emit(
                'message',
                formatMessage(botName, `${user.username} has left chat room`)
            );
            // send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
            userLeave(user.id);
        }
    }); // eof disconnect event
})
server.listen(PORT, ()=> console.log(`Server started at ${PORT}`));

/*
socket.on() // to fire an event 
socket.emit() // send message to current user
socket.broadcast.emit() // to send message to all except the user
io.to() // to broadcast to all the users
*/

