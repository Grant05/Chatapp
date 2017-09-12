import React, { Component } from 'react'
import Login from './user/login'
import Signup from './user/signup'
import Main from './main/main'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

class App extends Component {

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/main' component={Main} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    )
  }

}

export default App
