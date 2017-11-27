import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'

import { GC_USER_ID, GC_AUTH_TOKEN } from '../../constants'

const css = {
    container: {
        margin: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    inputs: {
        width: '75vw',
        maxWidth: '250px'
    }
}
class Login extends Component {
    state = { isLogin: true, email: '', name: '', password: '', isLoginLoading: false, isSignInLoading: false }
    
    clickLogin = async (event) => {
        const { email, password } = this.state
        const { onLoginResult } = this.props
        this.setState({ isLoginLoading: true })
        
        this.props.authenticateUserMutation({ variables: { email, password } })
            .then(({ data }) => {
                this.setState({ isLoading: false })
                onLoginResult({ id: data.authenticateUser.id, email, token: data.authenticateUser.token })
            }) 
            .catch(error => {
                this.setState({ isLoading: false })
                onLoginResult({ error: error.graphQLErrors[0].functionError })
            })
    }

    clickSignin = async (event) => {
        const { name, email, password } = this.state
        const { onSignInResult } = this.props
        this.setState({ isSignInLoading: true })

        const signinResult = this.props.signupUserMutation({ variables: { name, email, password } })
            .then(({ data }) => {
                this.setState({ isSignInLoading: false })
                onSignInResult({ id: data.signupUser.id, email, token: data.signupUser.token })
            })
            .catch(error => {
                this.setState({ isSignInLoading: false })
                onSignInResult({ error: error.graphQLErrors[0].functionError })
            })
    }

    render () {
        const { isLogin, email, name, password, isLoginLoading, isSignInLoading } = this.state
        
        const loginBtn = (
            <Button onClick={ () => this.clickLogin() } raised color='accent'>
                { isLoginLoading && <CircularProgress size={ 20 } color='accent' style={{ marginRight: '1em' }} /> }
                Login
            </Button>
        )

        const signInBtn = (
            <Button onClick={ () => this.clickSignin() } raised color='accent'>
                { isSignInLoading && <CircularProgress size={ 20 } color='accent' style={{ marginRight: '1em' }} /> }
                Sign in
            </Button>
        )

        const switchBtn = <Button onClick={ () => this.setState({ isLogin: !isLogin }) }>{ isLogin ? 'Create an account' : 'Already have an account ?' }</Button>

        return (
            <div style={ css.container }>
                <Typography type='display1'>Connection</Typography>
                <br />
                <TextField style={ css.inputs } label='Email' type='email' value={ email } onChange={ evt => this.setState({ email: evt.target.value }) } />
                <br />
                { !isLogin && <TextField style={ css.inputs } label='Name' type='text' value={ name } onChange={ evt => this.setState({ name: evt.target.value }) } /> }
                { !isLogin && <br /> }
                <TextField style={ css.inputs } label='Password' type='password' value={ password } onChange={ evt => this.setState({ password: evt.target.value }) } />
                <br />
                { isLogin ? loginBtn : signInBtn }
                {/* <Button onClick={ () => this.clickLogin() } raised color='accent'>
                    { isLoginLoading && <CircularProgress size={ 20 } color='accent' style={{ marginRight: '1em' }} /> }
                    Login
                </Button> */}
                <br />
                { switchBtn }
            </div>
        )
    }
}

const SIGNUP_USER_MUTATION = gql`
  mutation SignupUserMutation($name: String!, $email: String!, $password: String!) {
    signupUser(
      name: $name,
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
        id
    }
  }
`

export default compose(
graphql(SIGNUP_USER_MUTATION, { name: 'signupUserMutation' }),
graphql(AUTHENTICATE_USER_MUTATION, { name: 'authenticateUserMutation' })
)(Login)