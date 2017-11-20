import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../logo.svg'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

const css = {
    header: { 
        display: 'flex', 
        justifyContent: 'flex-end', 
        margin: '15px' 
    },
    headerButtons: { marginLeft: '15px' },
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
    render () {
        return (
            <div>
                <div style={ css.header }>
                    <Link to='/login'><Button style={ css.headerButtons } raised color='primary'>Login</Button></Link>
                    <Link to='/signin'><Button style={ css.headerButtons } raised color='accent'>Sign In</Button></Link>
                </div>
                <div style={ css.main }>
                    <Typography type='display3' align='center'>Project Tracker</Typography>
                    <br />
                    <Logo />
                    <br />
                    <div>
                        <Link to='/projects'><Button style={ css.links }>Projects</Button></Link>
                        <Link to='/tasks'><Button style={ css.links }>Tasks</Button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeScreen