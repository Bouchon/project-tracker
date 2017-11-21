import React, { Component } from 'react'
import Button from 'material-ui/Button'
import LoginModal from '../Login/LoginModal'

export default class Header extends Component {
    state = { loginOpen: false }

    render () {
        const { loginOpen } = this.state
        const { login, onLoginResult, onSignInResult, onLogout } = this.props
        return (
            <div style={{ margin: '15px', display: 'flex', justifyContent: 'flex-end' }}>
                <LoginModal 
                    open={ loginOpen }
                    onRequestClose={ () => this.setState({ loginOpen: false }) }
                    onLoginResult={ onLoginResult }
                    onSignInResult={ onSignInResult } />
                
                { login.token === '' || login.token === undefined ? 
                    <Button raised color='accent' onClick={ () => this.setState({ loginOpen: true }) }>Connect</Button> :
                    (
                        <div>
                            <span>{ login.email } </span>
                            <Button raised color='accent' onClick={ onLogout }>Logout</Button>
                        </div>
                    )
                }
            </div>
        )
    }
}