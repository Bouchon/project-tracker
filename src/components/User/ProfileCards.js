import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Menu, { MenuItem } from 'material-ui/Menu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui-icons/MoreVert'

const css = {
    container: {        
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        margin: '15px',
        padding: '15px 0 15px 15px',
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: '15px'
    }
}

class ProfileCards extends Component {
    state = { menuOpen: false, anchorEl: null }

    getInitials (name) {
        const words = name.split(' ')
        return words.length === 1 ? 
            words[0][0].toUpperCase() : words[0][0].toUpperCase() + words[1][0].toUpperCase()
    }

    render () {
        const { users } = this.props
        const { anchorEl, menuOpen } = this.state
        return (
            <div style={ css.container }>
            { users.map(user => (
                <Paper key={ user.id } style={ css.paper }>
                    <Avatar style={ css.avatar }>{ this.getInitials(user.name) }</Avatar>
                    <Typography>{ user.name }</Typography>
                    <IconButton onClick={ evt => this.setState({ anchorEl: evt.currentTarget, menuOpen: true }) }><MoreVertIcon /></IconButton>
                </Paper>
            )) }
                <Menu anchorEl={ anchorEl } open={ menuOpen } onRequestClose={ () => this.setState({ menuOpen: false }) }>
                    <MenuItem onClick={ () => this.props.dispatch(push('/users/' + user.id)) }>Profile</MenuItem>
                    <MenuItem onClick={ () => this.props.dispatch(push('/projects/users/' + user.id)) }>Projects</MenuItem>
                    <MenuItem onClick={ () => this.props.dispatch(push('/tasks/users/' + user.id)) }>Tasks</MenuItem>
                    <MenuItem onClick={ () => this.props.dispatch(push('/users/' + user.id + '/relations')) }>Relations</MenuItem>
                    <MenuItem>Add relation</MenuItem>
                </Menu>
            </div>
        )
    }
}

export default connect()(ProfileCards)