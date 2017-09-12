import React, { Component } from 'react'
import ChatForm from './chatForm'
import ChatMessage from './chatMessage'
import axios from 'axios'
import io from 'socket.io-client'
const socket = io(`http://localhost:8080`)

class Chat extends Component {

  state = {
    messages: [],
  }

  componentWillMount () {
    axios.get('/chat')
      .then(res => {
        console.log('Successfully retrieved ALL chat messages', res)
        this.setState({
          messages: res.data
        })
      })

    socket.on('chat', message => {
      this.setState({
        messages: [...this.state.messages, message]
      })
    })
    socket.on('deletedChat', deletedMessage => {
      let newMessages = this.state.messages
      newMessages.forEach((msg, index) => {
        if (msg._id === deletedMessage._id) {
          newMessages.splice(index, 1)
        }
      })
      this.setState({
        messages: newMessages
      })
    })
    socket.on('editedChat', editedMessage => {
      let newMessages = this.state.messages
      for (let i = 0; i < newMessages.length; i++) {
        if (newMessages[i]._id === editedMessage._id) {
          newMessages[i] = editedMessage
        }
      }
      this.setState({
        messages: newMessages
      })
    })
  }

  updateChat = (message) => {
    console.log('Update Chat sent: ', message)
    socket.emit('chat', message)
  }

  removeMessage = (deletedMessage) => {
    console.log('Deleted message: ', deletedMessage)
    socket.emit('deletedChat', deletedMessage)
  }

  editMessage = (editedMessage) => {
    console.log('Edited message: ', editedMessage)
    socket.emit("editedChat", editedMessage)
  }

  render () {
    return (
      <div>
        <div className="chat-container">
          {this.state.messages.map(input =>
            <ChatMessage
              key={input._id}
              id={input._id}
              currentUser={this.props.username}
              username={input.username}
              text={input.text}
              date={input.date}
              removeMessage={this.removeMessage}
              editMessage={this.editMessage}
            />
          )}
        </div>
        <ChatForm username={this.props.username} updateChat={this.updateChat} />
      </div>
    )
  }

}

export default Chat
