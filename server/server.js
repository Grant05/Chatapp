const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = require('express')();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080


const userController = require('./user/userController')
const cookieController = require('./auth/cookieController')
const chatController = require('./chat/chatController')

const mlabURI = 'mongodb://grant:world@ds163053.mlab.com:63053/authenticationprac11'
const testServer = 'mongodb://localhost/crudPrac'
mongoose.connect(testServer)

app.use(bodyParser(), cookieParser())
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist', 'index.html'))
// })

app.post('/user', userController.createUser, cookieController.setCookie)
app.get('/user', userController.verifyUser, cookieController.setCookie)
app.get('/chat', chatController.getMessages)

app.post('/chat', chatController.postMessage)
app.delete('/chat/:messageID', chatController.deleteMessage)
app.patch('/chat/:messageID', chatController.editMessage)

const server = app.listen(PORT, () => {
  console.info('Connected to port 8080')
})

const io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log('A new user has connected: ', socket.id)

  socket.on('chat', msg => {
    io.sockets.emit('chat', msg)
  })
  socket.on('deletedChat', (msg) => {
    io.sockets.emit('deletedChat', msg)
  })
  socket.on('editedChat', (msg) => {
    io.sockets.emit('editedChat', msg)
  })

  socket.on('disconnect', () => console.log(`User ${socket.id} has disconnected`))
})
