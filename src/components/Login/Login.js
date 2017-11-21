import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import AccountCircleIcon from 'material-ui-icons/AccountCircle'

const css = {
    main: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        margin: '15px'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '15px'
    },
    avatarIcon: {
        width: '75px',
        height: '75px'
    },
    loginButton: {
        alignSelf: 'flex-end',
        margin: '15px 0'
    }
}

export default class Login extends Component {
    render () {
        return (
            <div style={ css.main }>
                <Paper style={ css.container }>
                    <Avatar style={ css.avatarIcon }><AccountCircleIcon style={ css.avatarIcon } /></Avatar>
                    <TextField type='email' label="Email" />
                    <TextField type='password' label="Password" />
                    <Button style={ css.loginButton } raised color='primary'>Login</Button>
                </Paper>
            </div>
        )
    }
}