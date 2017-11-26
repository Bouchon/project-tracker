import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import LoginModal from '../Login/LoginModal'

const css = {
    header: { 
        margin: '15px', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end' 
    },
    loginButton: {
        marginLeft: '15px'
    }
}
export default class Header extends Component {
    state = { loginOpen: false }

    render () {
        const { loginOpen } = this.state
        const { login, onLoginResult, onSignInResult, onLogout } = this.props
        return (
            <div>
                <LoginModal 
                    open={ loginOpen }
                    onRequestClose={ () => this.setState({ loginOpen: false }) }
                    onLoginResult={ onLoginResult }
                    onSignInResult={ onSignInResult } />
                
                { login.token === '' || login.token === undefined ? 
                    (
                        <div style={ css.header}>
                            <Button style={ css.loginButton } raised color='accent' onClick={ () => this.setState({ loginOpen: true }) }>Connect</Button>
                        </div>
                    ) :
                    (
                        <div style={ css.header }>
                            <Typography>{ login.email } </Typography>
                            <Button style={ css.loginButton } raised onClick={ onLogout }>Logout</Button>
                        </div>
                    )
                }
            </div>
        )
    }
}