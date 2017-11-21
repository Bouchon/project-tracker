import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Wrapper from './Wrapper'
import Header from './Header'
import Login from './Login'

import HomeScreen from '../Home/HomeScreen'

import CreateLink from '../Tuto/CreateLink'
import LinkList from '../Tuto/LinkList'

const root = document.querySelector('#app')

export default class App extends Component {
  render() {
    const { store } = this.props
    return (
      <Wrapper store={ store }>
        <div>
          <Route exact path='/' component={ HomeScreen } />
        </div>
      </Wrapper>
    )
  }
}