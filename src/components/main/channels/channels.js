import React, { Component } from 'react'
import TextChannels from './TextChannels'

class Channels extends Component {

  render () {
    return (
      <div>
        <TextChannels username={this.props.username}/>
      </div>
    )
  }

}

export default Channels
