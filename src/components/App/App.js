import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import Hidden from 'material-ui/Hidden'


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
          this.props.logIn(data.id, data.email, data.name, data.token)
      }
  }

  handleSignInResult (data) {
      if (data.error) {
          alert(data.error)
          this.props.logOut()
      } else {
          this.props.logIn(data.id, data.email, data.name, data.token)
      }
  }

  handleLogout () {
      this.props.logOut()
  }

  render() {
    const { history, login } = this.props
    const { loginOpen } = this.state

    if (login.token === '') {
        return (
            <Login 
                onLoginResult={ data => this.handleLoginResult(data) }
                onSigninResult={ data => this.handleSignInResult(data) } />
        )
    }

    return (
        <div>
            <ConnectedRouter history={ history }>
                <Hidden mdUp>
                    <AppRoutes mobile history={ history } />
                </Hidden>
                <Hidden smDown>
                    <AppRoutes history={ history } />
                </Hidden>
            </ConnectedRouter>
        </div>
    )
  }
}

const mapStateToProps = ({ login }) => ({ login })
export default connect(mapStateToProps, { logIn, logOut })(App)