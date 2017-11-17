import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Wrapper from './Wrapper'
import Header from './Header'
import Login from './Login'
import CreateLink from '../Tuto/CreateLink'
import LinkList from '../Tuto/LinkList'

const root = document.querySelector('#app')

export default class App extends Component {
    render() {
      return (
        <Wrapper>
          <div>
            <Header />
            <Route exact path='/' component={ LinkList } />
            <Route exact path='/login' component={ Login }/>
            <Route exact path='/create' component={ CreateLink } />
          </div>
        </Wrapper>
      )
    }
  }