import React from 'react'
import { Link } from 'react-router-dom'
import Chat from './chat/chat'
import Channels from './channels/channels'
import Header from './header'

class Main extends React.Component {

  state = {
    username: this.props.location.state.from
  }

  render () {
    return (
      <div>
        <Header username={this.state.username} />
        <Chat username={this.state.username}/>
        <Channels username={this.state.username}/>
        <Link to='/'>BACK</Link>
      </div>
    )
  }

}

export default Main
