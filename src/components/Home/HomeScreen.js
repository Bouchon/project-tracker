import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Logo from '../../logo.svg'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

import LoginModal from '../Login/LoginModal'

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

    render () {
        const { login } = this.props
        const { loginOpen } = this.state

        return (
            <div>
                { login.state === 'logged-out' &&
                    <div style={ css.header }>
                        <LoginModal 
                            open={ loginOpen } 
                            onRequestClose={ () => this.setState({ loginOpen: false }) } />
                            
                        <Button onClick={ () => this.setState({ loginOpen: true }) } raised color='accent'>Connection</Button>
                    </div>
                }
                <div style={ css.main }>
                    <Typography type='display3' align='center'>Project Tracker</Typography>
                    <br />
                    <Logo />
                    <br />
                    { login.state === 'success' &&
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
export default connect(mapStateToProps)(HomeScreen)