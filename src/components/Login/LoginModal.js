import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

import Dialog, { DialogContent, DialogActions } from 'material-ui/Dialog'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Tabs, { Tab } from 'material-ui/Tabs'
import ArrowForwardIcon from 'material-ui-icons/ArrowForward'
import { CircularProgress } from 'material-ui/Progress'


import { GC_USER_ID, GC_AUTH_TOKEN } from '../../constants'

class LoginModal extends Component {
    state = { 
        tabValue: 0,
        email: '',
        password: '',
        isLoading: false
    }

    async login () {
        const { email, password } = this.state
        const { onRequestClose } = this.props
        this.setState({ isLoading: true })
        const loginResult = await this.props.authenticateUserMutation({ variables: { email, password }})
        this.setState({ isLoading: false })
        console.log(loginResult)        
    }

    async signIn () {
        const { email, password } = this.state
        const { onRequestClose } = this.props
        this.setState({ isLoading: true })
        setTimeout(() => this.setState({ isLoading: false }), 3000)
        console.log(email, password)
    }

    render () {
        const { open, onRequestClose } = this.props
        const { tabValue, email, password, isLoading } = this.state
        
        return (
            <Dialog open={ open } onRequestClose={ onRequestClose }>
                <Tabs value={ tabValue } onChange={ (evt, value) => this.setState({ tabValue: value }) } indicatorColor='primary'>
                    <Tab label='Login' />
                    <Tab label='Sign In' />
                </Tabs>
                <DialogContent>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField value={ email }    onChange={ event => this.setState({ email: event.target.value }) }   style={{ margin: '15px 0' }}  type='email' label='Email' />
                        <TextField value={ password } onChange={ event => this.setState({ password: event.target.value }) } style={{ margin: '15px 0' }} type='password' label='Password' />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ onRequestClose }>Cancel</Button>
                    <Button onClick={ () => tabValue === 0 ? this.login() : this.signIn() } disabled={ isLoading } color='accent'>
                        { isLoading && <CircularProgress size={ 20 } color='accent' style={{ marginRight: '1em' }} /> }
                        Submit
                        { !isLoading && <ArrowForwardIcon style={{ marginLeft: '1em' }} /> }
                    </Button>
                </DialogActions>
            </Dialog>
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
)(LoginModal)
