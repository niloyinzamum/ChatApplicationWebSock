const path= require('path')
const http = require('http')
const express = require('express');
const socketio = require('socket.io');
const { disconnect } = require('process');
const formatMessage = require('./utils/messages')
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

//Set static folder 
app.use(express.static(path.join(__dirname, 'public')))

const botName = 'AdminBot'

//Run when client connects
io.on('connection', socket =>{
    //join room 
    socket.on('joinRoom',({username, room})=>{
    const user = userJoin(socket.id, username, room)
    
    socket.join(user.room);
    //message for new user
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord'))
    //message for everyone except new user
    socket.broadcast.to(user.room).emit('message', formatMessage(botName, `A ${user.username} has joined!`))
    })

    //send users and room info
    io.to(user.room).emit('roomUsers',{
        room: user.room,
        users: getRoomUsers(user.room)
    });

    
    //Listen for messages from the client
    socket.on('chatMessage', msg=>{
        const user = getCurrentUser(socket.id); 
        io.to(user.room).emit('message', formatMessage(user.username, msg))
    })

    //message for everyone
    socket.on('disconnect', ()=>{
        const user = userLeave(socket.id);
        if(user){
            io.to(user.room).emit('message',formatMessage(botName, `${user.username} has left the chat`))

        }
    })

})


const PORT = 3000|| process.env.PORT;

server.listen(PORT, ()=>console.log(`server running on port ${PORT}`))
