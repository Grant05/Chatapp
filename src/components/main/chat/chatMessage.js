import React, { Component } from 'react'
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


class ChatMessage extends Component {

  state = {
    onEdit: false,
    text: '',
  }

  handleRemove = () => {
    axios.delete(`/chat/${this.props.id}`)
      .then(res => {
        this.props.removeMessage(res.data)
      })
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  handleEdit = (e) => {
    console.log('edit e: ', e.props)
    this.setState({
      onEdit: true
    })
  }

  editText = () => {
    axios.patch(`/chat/${this.props.id}`, { text: this.state.text })
      .then(res => {
        this.props.editMessage(res.data)
        this.setState({
          onEdit: false,
      })
    })
  }

  handleClick = () => {
    this.editText()
  }

  handleEnter = (e) => {
    if (e.keyCode === 13) {
      this.editText()
    }
  }

  render () {
    let Month = Months[parseInt(this.props.date.slice(5,7))];
    let Day = parseInt(this.props.date.slice(8,10));
    let Year = parseInt(this.props.date.slice(0,4))

    if (this.state.onEdit) {
      return (
          <MuiThemeProvider>
            <div>
              <TextField
                id='edit-text'
                value={this.state.text}
                onChange={this.handleChange}
                placeholder='Message'
                onKeyUp={this.handleEnter}
              />
              <RaisedButton label="Save" onClick={this.handleClick}/>
            </div>
          </MuiThemeProvider>
      )
    }
    return (
      <div className="msg-container">
        <p>{this.props.username}: <span>{this.props.text}</span></p>
        {this.props.currentUser === this.props.username &&
          (
            <MuiThemeProvider>
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                style={{position: 'absolute', right: 0, top: 0}}
              >
                <MenuItem primaryText="Edit" onClick={this.handleEdit} ref={this.props.username}/>
                <MenuItem primaryText="Remove" onClick={this.handleRemove}/>
                <MenuItem primaryText={Month +' ' +Day +', '+ Year} />
              </IconMenu>
            </MuiThemeProvider>
          )
        }
      </div>
    )
  }

}

export default ChatMessage
