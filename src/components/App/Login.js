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
    state = { email: '', password: '', isLoading: false }
    
    clickLogin = async (event) => {
        const { email, password } = this.state
        const { onRequestClose, onLoginResult } = this.props
        this.setState({ isLoading: true })
        
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

    render () {
        const { email, password, isLoading } = this.state

        return (
            <div style={ css.container }>
                <Typography type='display1'>Login</Typography>
                <br />
                <TextField style={ css.inputs } label='Email' type='email' value={ email } onChange={ evt => this.setState({ email: evt.target.value }) } />
                <TextField style={ css.inputs } label='Password' type='password' value={ password } onChange={ evt => this.setState({ password: evt.target.value }) } />
                <br />
                <Button onClick={ () => this.clickLogin() } raised color='accent'>
                    { isLoading && <CircularProgress size={ 20 } color='accent' style={{ marginRight: '1em' }} /> }
                    Login
                </Button>
                <br />
                <Button>Create an account</Button>
            </div>
        )
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
        id
    }
  }
`

export default compose(
graphql(SIGNUP_USER_MUTATION, { name: 'signupUserMutation' }),
graphql(AUTHENTICATE_USER_MUTATION, { name: 'authenticateUserMutation' })
)(Login)