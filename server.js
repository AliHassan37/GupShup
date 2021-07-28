const express = require('express')

const app = express()
const http= require('http').createServer(app)

const PORT = process.env.PORT || 5000

http.listen(PORT, ()=>{
    console.log("hello from port ",PORT)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html')
})



//socket work

const io = require('socket.io')(http)
io.on('connection', (socket)=>{
    console.log('connected...')

    socket.on('Any Name',(Message)=>{
        console.log("Message from client side: ",Message);
    // is function main jitny b browser connected hain unko msg bejhna hai

    socket.broadcast.emit('Any Name',Message)
    
    })
})