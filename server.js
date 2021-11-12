const path= require('path')
const http = require('http')
const express = require('express');
const socketio = require('socket.io');
const { disconnect } = require('process');

const app = express();
const server = http.createServer(app)
const io = socketio(server)

//Set static folder 
app.use(express.static(path.join(__dirname, 'public')))

//Run when client connects
io.on('connection', socket =>{
    //message for new user
    socket.emit('message', 'Welcome to ChatCord')
    //message for everyone except new user
    socket.broadcast.emit('message', "New user joined!")
    //message for everyone
    socket.on('disconnect', ()=>{
        io.emit('message','A user has left')
    })
    //Listen for messages from the client
    socket.on('chatMessage', msg=>{
        io.emit('message', msg)
    })

})


const PORT = 3000|| process.env.PORT;

server.listen(PORT, ()=>console.log(`server running on port ${PORT}`))
