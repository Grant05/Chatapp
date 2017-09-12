import React, { Component } from 'react'
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import { Button } from 'react-bootstrap'

class ChatForm extends Component {

  state = {
    text: '',
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  handleClick = () => {
    this.returnText()
  }

  handleInput = (e) => {
    if (e.keyCode === 13) {
      this.returnText()
    }
  }

  returnText = () => {
    const newMessage = {
      username: this.props.username,
      text: this.state.text
    }
    axios.post('/chat', newMessage)
      .then(res => {
        this.props.updateChat(res.data)
        this.setState({
          text: ''
        })
      })
  }

  render () {
    return (
      <div className='chat-form'>
        <MuiThemeProvider>
          <div>
            <TextField
              id='chat-field'
              value={this.state.text}
              onChange={this.handleChange}
              hintText='Message'
              style={{width: '90%'}}
              onKeyUp={this.handleInput}
            />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }

}

export default ChatForm
