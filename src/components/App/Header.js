import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Hidden from 'material-ui/Hidden'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Menu, { MenuItem } from 'material-ui/Menu'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import NotificationsIcon from 'material-ui-icons/Notifications'
import SearchIcon from 'material-ui-icons/Search'

import Logo from '../../logo.svg'
import AppMenu from './AppMenu'

const menu = [
    { label: 'Home', children: [
        { label: 'Home',            href: '/' }
    ] },
    { label: 'Projects', children: [ 
        { label: 'My projects',     href: '/projects/users/me' },   
        { label: 'All projects',    href: '/projects/users/all' }
    ] },
    { label: 'Tasks', children: [
        { label: 'My tasks',        href: '/tasks/users/me' },
        { label: 'All tasks',       href: '/tasks/users/all'}
    ] },
    { label: 'Profiles', children: [ 
        { label: 'My profile',      href: '/users/me' },
        { label: 'My relations',    href: '/users/me/relations' },
        { label: 'All profiles',    href: '/users/all' }
    ] }   
]

const css = {
    container: { padding: '8px 16px 8px 216px' },
    line: { display: 'flex', alignItems: 'center' },
    flexSpace: { flexGrow: 1 }
}

class Header extends Component {
    state = { drawerOpen: false, menuOpen: false, anchorEl: null }

    redirect (url, value) {
        this.props.dispatch(push(url))
    }

    render () {
        const { drawerOpen, menuOpen, anchorEl } = this.state
        const { login, onLogout } = this.props
        const pathName = window.location.pathname
        const title = pathName === '/' ? 
            'Home' : 
            pathName.split('/')[1].charAt(0).toUpperCase() + pathName.split('/')[1].slice(1)

        return (
            <AppBar position='static' style={ css.container }>
                <div style={ css.line }>
                    <Hidden mdUp>
                        <Drawer type='temporary' open={ drawerOpen } onRequestClose={ () => this.setState({ drawerOpen: false }) }><AppMenu menu={ menu } /></Drawer>
                        <IconButton color='inherit' onClick={ () => this.setState({ drawerOpen: true }) }><MenuIcon /></IconButton>
                    </Hidden>
                    <Hidden mdDown>
                        <Drawer type='permanent' open><AppMenu menu={ menu } /></Drawer>
                    </Hidden>
                    
                    <Typography color='inherit' type='title'>{ title }</Typography>

                    <div style={ css.flexSpace }></div>
                    <IconButton><NotificationsIcon /></IconButton>
                    <Button color='inherit' onClick={ evt => this.setState({ menuOpen: true, anchorEl: evt.currentTarget }) }>{ login.name }</Button>

                    <Menu anchorEl={ anchorEl } open={ menuOpen } onRequestClose={ () => this.setState({ menuOpen: false }) }>
                        <MenuItem disabled>{ login.email }</MenuItem>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem onClick={ onLogout }>Log out</MenuItem>
                    </Menu>
                </div>
            </AppBar>
        )
    }
}

export default connect()(Header)