import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Logo from '../../logo.svg'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

import Header from '../App/Header'
import LoginModal from '../Login/LoginModal'

import { logIn, logOut } from '../../action-creators/login'

const css = {
    header: { 
        display: 'flex', 
        justifyContent: 'flex-end', 
        margin: '15px' 
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    links: {
        margin: '15px',
        width: '150px'
    }
}

class HomeScreen extends Component {
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

    render () {
        const { login } = this.props
        const { loginOpen } = this.state

        return (
            <div>
                <Header 
                    login={ login }
                    onLoginResult={ data => this.handleLoginResult(data) }
                    onSignInResult={ data => this.handleSignInResult(data) }
                    onLogout={ () => this.handleLogout() } />
                <div style={ css.main }>
                    <Typography type='display3' align='center'>Project Tracker</Typography>
                    <br />
                    <Logo />
                    <br />
                    { login.token !== '' &&
                        <div>
                            <Button style={ css.links }>Projects</Button>
                            <Button style={ css.links }>Tasks</Button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ login }) => ({ login })
export default connect(mapStateToProps, { logIn, logOut })(HomeScreen)