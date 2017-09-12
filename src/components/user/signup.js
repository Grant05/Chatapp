import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Signup extends Component {

  state = {
    username: '',
    password: '',
    signedUp: false,
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

  createUser = () => {
    const userData = {
      username: this.state.username,
      password: this.state.password
    }
    axios.post('/user', userData)
      .then(res => {
        console.log('USER SENT BACK FROM RES.LOCALS: ', res)
        this.setState({
          signedUp: true
        })
      })
  }

  render () {
    const { signedUp } = this.state

    return (
      <div className="auth-form">
        <MuiThemeProvider>
          <div>
            <TextField id='username' value={this.state.username} onChange={this.handleUsername} hintText='Username' fullWidth={true} floatingLabelText="Username" />
            <TextField id='password' value={this.state.password} onChange={this.handlePassword} hintText='Password' fullWidth={true} floatingLabelText="Password" type='password' />
            <RaisedButton label="Register account" fullWidth={true} onClick={this.createUser}/>
          </div>
        </MuiThemeProvider>
        {signedUp && (
          <Redirect to='/' />
        )}
        <br></br>
        <Link to='/'>I already have an account</Link>
      </div>
    )
  }

}

export default Signup
