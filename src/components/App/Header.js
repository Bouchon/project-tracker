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
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import NotificationsIcon from 'material-ui-icons/Notifications'

import Logo from '../../logo.svg'
import AppMenu from './AppMenu'

const drawerWidth = 200
const css = {
    container: { padding: '8px 8px 8px ' + (8 + drawerWidth) + 'px' },
    drawerHeader: {
        height: '48px',
        padding: '8px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    line1: { display: 'flex', alignItems: 'center' },
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
        
        return (
            <AppBar position='static' style={ css.container }>
                <div style={ css.line1 }>
                    <Hidden mdUp>
                        <Drawer type='temporary' open={ drawerOpen } onRequestClose={ () => this.setState({ drawerOpen: false }) }><AppMenu /></Drawer>
                        <IconButton color='inherit' onClick={ () => this.setState({ drawerOpen: true }) }><MenuIcon /></IconButton>
                    </Hidden>
                    <Hidden mdDown>
                        <Drawer type='permanent' open><AppMenu /></Drawer>
                    </Hidden>

                    <Typography color='inherit' type='title'>My Projects</Typography>
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