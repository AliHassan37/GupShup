const socket = io() 

 let name;
let txt_area =  document.querySelector('#textarea')
let msg_area = document.querySelector('.msg_area')
let btn = document.querySelector('#font')
do{
    name = prompt("Enter Name First");
 }while(!name)

 txt_area.addEventListener('keyup',(e)=>{
     if (e.key==='Enter') {
         sendMessage(e.target.value)
     } 
 })
 btn.addEventListener('click', (e)=>{
        sendMessage(txt_area.value)
 })

 function sendMessage(msg){
     let Message = {
         user: name,
         message: msg.trim()
     }

     // now append msg below logic
appendMessage(Message,'outgoing')
txt_area.value='';
scrollToBottom();
// now send msg to server

     socket.emit('Any Name', Message)

 }


 function appendMessage(Message, type) {
     let mainDiv = document.createElement('div');
     let className = type;
     mainDiv.classList.add(className, 'msg'); 

     let markup = `
                    <h4>${Message.user}</h4>
                    <p>${Message.message}</p>
     `
     mainDiv.innerHTML= markup; 
     msg_area.appendChild(mainDiv);
}



// Recieve messages

socket.on('Any Name', (Message)=>{
    console.log("Message: ", Message);
    appendMessage(Message,'incoming');
    scrollToBottom();
})


function scrollToBottom() {
    msg_area.scrollTop = msg_area.scrollHeight;
}