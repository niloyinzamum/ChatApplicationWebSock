const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users')

//get username from url
const   {username, room} =  Qs.parse(location.search,{  ignoreQueryprefix: true,});

const socket = io();

//join room
console.log(username, room)
socket.emit('joinRoom', { username,  room });

//get room and users
socket.on('roomUsers', ({room, users})=>{
  ouputRoomName(room);
  ouputUsers(users)
})


//get message from the server
socket.on('message', message => {
  console.log(message);
  outputMessage(message)

//Scroll down
chatMessages.scrollTop = chatMessages.scrollHeight


})

//message submit  
chatForm.addEventListener('submit', e=>{
  e.preventDefault()

  //get message text
  const msg = e.target.elements.msg.value

  //emit message to server
  socket.emit('chatMessage', msg)

  //clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus;
})


//output to DOM
function outputMessage(message){
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div)
}

//add room name to dom
function outputRoomName(room){
  roomName.innerText = room;
}

//Add users to DOM
function outputUsers(users){
  userList.innerHTML =`
  ${users.map(user=>`<li>${user.username}</li>`).join('')}`;

}