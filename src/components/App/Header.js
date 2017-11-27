import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Menu, { MenuItem } from 'material-ui/Menu'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import NotificationsIcon from 'material-ui-icons/Notifications'

import Logo from '../../logo.svg'
import LoginModal from '../Login/LoginModal'

const css = {
    headerLine1: {
        paddingRight: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    user: {
        flex: '0 1 auto'
    },
    headerLine2: {
        padding: '0 10vw',
        display: 'flex'
    },
    logo: {
        marginRight: '-30px'
    },
    headerLine3: {
        padding: '0 10vw'
    }
}

class Header extends Component {
    state = { selectedTab: 0, menuOpen: false, anchorEl: null }

    redirect (url, value) {
        this.props.dispatch(push(url))
        this.setState({ selectedTab: value })
    }

    render () {
        const { selectedTab, menuOpen, anchorEl } = this.state
        const { login, onLogout } = this.props
        
        return (
            <AppBar position='static'>
                <div style={ css.headerLine1 }>
                    <IconButton><NotificationsIcon /></IconButton>
                    <List style={ css.user }>
                        <ListItem button onClick={ event => this.setState({ menuOpen: true, anchorEl: event.currentTarget }) }>
                            <ListItemText primary={ login.email } />
                        </ListItem>
                    </List>

                    <Menu anchorEl={ anchorEl } open={ menuOpen } onRequestClose={ () => this.setState({ menuOpen: false }) }>
                        <MenuItem disabled>{ login.email }</MenuItem>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem onClick={ onLogout }>Log out</MenuItem>
                    </Menu>
                </div>
                <div style={ css.headerLine2 }>
                    <Logo style={ css.logo } />
                    <Typography type='display3'>Project Tracker</Typography>
                </div>
                <Tabs style={ css.headerLine3 } value={ selectedTab }>
                    <Tab onClick={ () => this.redirect('/project', 0) } label='Projects' />
                    <Tab onClick={ () => this.redirect('/task', 1) } label='Tasks' />
                    <Tab onClick={ () => this.redirect('/user', 2) } label='Users' />
                </Tabs>
            </AppBar>
        )
    }
}

export default connect()(Header)
// export default class Header extends Component {
//     state = { loginOpen: false }

//     render () {
//         const { loginOpen } = this.state
//         const { login, onLoginResult, onSignInResult, onLogout } = this.props
//         return (
//             <div>
//                 <LoggedInHeader />
//                 <LoginModal 
//                     open={ loginOpen }
//                     onRequestClose={ () => this.setState({ loginOpen: false }) }
//                     onLoginResult={ onLoginResult }
//                     onSignInResult={ onSignInResult } />
                
//                 { login.token === '' || login.token === undefined ? 
//                     (
//                         <div style={ css.header}>
//                             <Button style={ css.loginButton } raised color='accent' onClick={ () => this.setState({ loginOpen: true }) }>Connect</Button>
//                         </div>
//                     ) :
//                     (
//                         <div style={ css.header }>
//                             <Typography>{ login.email } </Typography>
//                             <Button style={ css.loginButton } raised onClick={ onLogout }>Logout</Button>
//                         </div>
//                     )
//                 }
//             </div>
//         )
//     }
// }