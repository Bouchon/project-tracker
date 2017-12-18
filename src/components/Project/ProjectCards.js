import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar'
import Menu, { MenuItem } from 'material-ui/Menu'
import IconButton from 'material-ui/IconButton'
import SupervisorAccountIcon from 'material-ui-icons/SupervisorAccount'
import WorkIcon from 'material-ui-icons/Work'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import AddIcon from 'material-ui-icons/Add'

const css = {
    container: {
    },
    paper: {
        padding: '15px',
        margin: '15px 0',
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        marginRight: '15px'
    },
    name: {
        width: '20vw',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    buttons: {
        padding: '8px',
        margin: 'auto',
    },
    iconButtons: {
        marginRight: '8px',
        color: 'rgb(185, 185, 185)'
    },
    moreButton: {
        marginLeft: 'auto'
    },
    addContainer: {
        display: 'flex',
        justifyContent: 'center'
    }
}

export default class ProjectCards extends Component {
    state = { menuAnchorEl: null, menuOpen: false }

    getInitials (name) {
        const words = name.split(' ')
        return words.length === 1 ? 
        words[0][0].toUpperCase() : words[0][0].toUpperCase() + words[1][0].toUpperCase()
    }

    render () {
        const { menuAnchorEl, menuOpen } = this.state
        const { projects, textSearch } = this.props
        return (
            <div style={ css.container }>
            { projects.filter(p => p.name.toLowerCase().includes(textSearch.toLowerCase())).map(project => (
                <Paper key={ project.id } style={ css.paper }>
                    <Avatar style={ css.avatar }>{ this.getInitials(project.author.name) }</Avatar>
                    <Typography style={ css.name } type='title'>{ project.name }</Typography>
                    <Button style={ css.buttons }><WorkIcon style={ css.iconButtons } /> tasks</Button>
                    <Button style={ css.buttons }><SupervisorAccountIcon style={ css.iconButtons } /> members</Button>
                    <IconButton style={ css.moreButton } onClick={ evt => this.setState({ menuAnchorEl: evt.currentTarget, menuOpen: true }) }><MoreVertIcon /></IconButton>
                </Paper>
            )) }                
                <Menu anchorEl={ menuAnchorEl } open={ menuOpen } onRequestClose={ () => this.setState({ menuOpen: false }) }>
                    <MenuItem>Dashboard</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </Menu>
            </div>
        )
    }
}