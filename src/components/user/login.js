import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Login extends Component {

  state = {
    username: '',
    password: '',
    isLoggedIn: false,

  }

  handleUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handlePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  verifyUser = () => {
    axios.get('/user', {
      params: {
        username: this.state.username,
        password: this.state.password,
      }
    })
      .then(res => {
        if (res.data) {
          this.setState({
            isLoggedIn: true
          })
        }
      })
  }

  handleClick = () => {
    this.verifyUser()
  }

  handleLogin = (e) => {
    if (e.keyCode === 13) {
      this.verifyUser()
    }
  }

  render () {
    const { isLoggedIn } = this.state

    return (
      <div className='auth-form'>
        <MuiThemeProvider>
          <div>
            <TextField id='username' value={this.state.username} onChange={this.handleUsername} placeholder='Username' fullWidth={true}/>
            <TextField id='password' value={this.state.password} onChange={this.handlePassword} placeholder='Password' fullWidth={true} onKeyUp={this.handleLogin} type='password' />
            <RaisedButton label="Log in" fullWidth={true} onClick={this.handleClick}/>
          </div>
        </MuiThemeProvider>
        {isLoggedIn && (
            <Redirect to={{pathname: '/main', state: { from: this.state.username }}}/>
        )}
        <br></br>
        <p>Need an account? <Link to='/signup'>Register</Link></p>
      </div>
    )
  }

}

export default Login
