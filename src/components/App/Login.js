import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { GC_USER_ID, GC_AUTH_TOKEN } from '../../constants'

class Login extends Component {
    state = { login: true, email: '', password: '' }
    
    changeName = (event) => this.setState({ name: event.target.value })
    changePassword = (event) => this.setState({ password: event.target.value })
    changeEmail = (event) => this.setState({ email: event.target.value })
    clickSwitch = () => this.setState({ login: !this.state.login, email: '', name: '', password: '' })

    clickLogin = async (event) => {
        const { email, password } = this.state
        const result = await this.props.authenticateUserMutation({ variables: { email, password }})
        const { id, token } = result.data.authenticateUser
        localStorage.setItem(GC_USER_ID, id)
        localStorage.setItem(GC_AUTH_TOKEN, token)
        this.props.history.push('/')
    }

    clickSignUp = async (event) => { 
        const { email, password } = this.state
        const result = await this.props.signupUserMutation({ variables: { email, password } })
        const { id, token } = result.data.signupUser
        localStorage.setItem(GC_USER_ID, id)
        localStorage.setItem(GC_AUTH_TOKEN, token)
        this.props.history.push('/')
     }

    render () {
        const { login, email, password } = this.state

        const block = login ?
        (
            <div>
                <h1>Login</h1>
                <label>Email : </label>
                <input value={ email } onChange={ this.changeEmail } />
                <br />

                <label>Password : </label>
                <input type='password' value={ password } onChange={ this.changePassword } />
                <br />

                <button onClick={ this.clickLogin }>Login</button>
                <button onClick={ this.clickSwitch }>Sign Up</button>
            </div>
        ) :
        (
            <div>
                <h1>Sign Up</h1>
                <label>Email : </label>
                <input value={ email } onChange={ this.changeEmail } />
                <br />

                <label>Password</label>
                <input type='password' value={ password } onChange={ this.changePassword } />
                <br />

                <button onClick={ this.clickSignUp }>Sign Up</button>
                <button onClick={ this.clickSwitch }>Already have an account ?</button>
            </div>
        )

        return block
    }
}

const SIGNUP_USER_MUTATION = gql`
mutation SignupUserMutation($email: String!, $password: String!) {
  signupUser(
    email: $email,
    password: $password
  ) {
    id
    token
  }
}
`

const AUTHENTICATE_USER_MUTATION = gql`
mutation AuthenticateUserMutation($email: String!, $password: String!) {
  authenticateUser(
    email: $email,
    password: $password
  ) {
    token
    user {
      id
    }
  }
}
`

export default compose(
graphql(SIGNUP_USER_MUTATION, { name: 'signupUserMutation' }),
graphql(AUTHENTICATE_USER_MUTATION, { name: 'authenticateUserMutation' })
)(Login)