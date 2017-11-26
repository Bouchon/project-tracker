import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../logo.svg'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

const css = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '25px'
    },
    title: {
        textAlign: 'center',
        zIndex: 1
    },
    logo: {
        marginTop: '-100px'
    },
    
    links: {
        margin: '15px',
        width: '150px'
    }
}

class HomeScreen extends Component {
    render () {
        return (
            <div style={ css.main }>
                <div style={ css.header }>
                    <Typography style={ css.title } type='display3'>Project Tracker</Typography>
                    <Logo style={ css.logo } />
                </div>
                <div>
                    <Link to='/project'><Button style={ css.links }>Projects</Button></Link>
                    <Link to='/task'><Button style={ css.links }>Tasks</Button></Link>
                </div>
            </div>
        )
    }
}

export default HomeScreen