const chatForm = document.getElementById('chat-form');

const socket = io();

//get message from the server
socket.on('message', message => {
  console.log(message);
  outputMessage(message)
})

//message submit  
chatForm.addEventListener('submit', e=>{
  e.preventDefault()

  //get message text
  const msg = e.target.elements.msg.value

  //emit message to server
  socket.emit('chatMessage', msg)
})


//output to DOM
function outputMessage(message){
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = ``
}