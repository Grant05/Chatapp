import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import allReducers from './reducers'

const rootEl = document.getElementById('root')

const store = createStore(allReducers)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , rootEl
)
