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

import { logIn, logOut } from '../../action-creators/login'

const menu = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects/users/me' },
    { label: 'Tasks', href: '/tasks/users/me' },
    { label: 'Users', href: '/users/me'}   
]

const css = {
    container: { padding: '8px 16px 8px 16px' },
    line: { display: 'flex', alignItems: 'center' },
    flexSpace: { flexGrow: 1 }
}

class Header extends Component {
    state = { drawerOpen: false, menuOpen: false, anchorEl: null }

    redirect (url) {
        this.props.dispatch(push(url))
    }

    render () {
        const { drawerOpen, menuOpen, anchorEl } = this.state
        const { login, logOut, children, selected } = this.props
        const title = selected

        return (
            <AppBar position='static' style={ css.container }>
                <div style={ css.line }>
                    <Hidden mdUp>
                        <Drawer type='temporary' open={ drawerOpen } onRequestClose={ () => this.setState({ drawerOpen: false }) }>
                            <AppMenu menu={ menu } selected={ selected } />
                        </Drawer>
                        <IconButton color='inherit' onClick={ () => this.setState({ drawerOpen: true }) }><MenuIcon /></IconButton>
                    </Hidden>
                    <Hidden smDown>
                        <div style={{ marginLeft: '200px' }}></div>
                        <Drawer type='permanent' open>
                            <AppMenu menu={ menu } selected={ selected } />
                        </Drawer>
                    </Hidden>
                                        
                    <Typography color='inherit' type='title'>{ title }</Typography>

                    <div style={ css.flexSpace }></div>
                    <IconButton><NotificationsIcon /></IconButton>
                    <Button color='inherit' onClick={ evt => this.setState({ menuOpen: true, anchorEl: evt.currentTarget }) }>{ login.name }</Button>

                    <Menu anchorEl={ anchorEl } open={ menuOpen } onRequestClose={ () => this.setState({ menuOpen: false }) }>
                        <MenuItem disabled>{ login.email }</MenuItem>
                        <MenuItem onClick={ () => this.redirect('/users/me') }>Profile</MenuItem>
                        <MenuItem onClick={ logOut }>Log out</MenuItem>
                    </Menu>
                </div>
                <div style={ css.line }>
                    <Hidden smDown><div style={{ marginLeft: '200px' }}></div></Hidden>
                    { children }
                </div>
            </AppBar>
        )
    }
}
const mapStateToProps = ({ login }) => ({ login })
export default connect(mapStateToProps, { logIn, logOut })(Header)