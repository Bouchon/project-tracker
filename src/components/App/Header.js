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

    componentWillMount () {
        const pathName = window.location.pathname
        let selected = 0
        switch (pathName) {
            case '/project':
            case '/project/create':
                this.state.selectedTab = 1; break
                
            case '/task': this.state.selectedTab = 2; break
            case '/user': this.state.selectedTab = 3; break
        }
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
                            <ListItemText primary={ login.name } />
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
                    <Tab onClick={ () => this.redirect('/', 0) } label='Home' />
                    <Tab onClick={ () => this.redirect('/project', 1) } label='Projects' />
                    <Tab onClick={ () => this.redirect('/task', 2) } label='Tasks' />
                    <Tab onClick={ () => this.redirect('/user', 3) } label='Users' />
                </Tabs>
            </AppBar>
        )
    }
}

export default connect()(Header)