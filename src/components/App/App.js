import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './Header'
import AppRoutes from './AppRoutes'

import Login from './Login'
import HomeScreen from '../Home/HomeScreen'
import ProjectScreen from '../Project/ProjectScreen'
import TaskScreen from '../Task/TaskScreen'

import CreateLink from '../Tuto/CreateLink'
import LinkList from '../Tuto/LinkList'

import { logIn, logOut } from '../../action-creators/login'

class App extends Component {
  state = { loginOpen: false }
  
  handleLoginResult (data) {
      if (data.error) {
          alert(data.error)
          this.props.logOut()
      } else {
          this.props.logIn(data.id, data.email, data.token)
      }
  }

  handleSignInResult (data) {
      if (data.error) {
          alert(data.error)
          this.props.logOut()
      } else {
          this.props.logIn(data.id, data.email, data.token)
      }
  }

  handleLogout () {
      this.props.logOut()
  }

  render() {
    const { history, login } = this.props
    const { loginOpen } = this.state

    if (login.token === '') {
        return <Login onLoginResult={ data => this.handleLoginResult(data) } />
    }

    return (
        <div>
            <Header
                login={ login }
                onLoginResult={ data => this.handleLoginResult(data) }
                onSignInResult={ data => this.handleSignInResult(data) }
                onLogout={ () => this.handleLogout() } />
            <AppRoutes history={ history } />
        </div>
    )
  }
}

const mapStateToProps = ({ login }) => ({ login })
export default connect(mapStateToProps, { logIn, logOut })(App)